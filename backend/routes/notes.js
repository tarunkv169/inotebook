const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//ROUTES1️⃣ FETCH/GET ALL NOTES OF PARTICULAR USER USING : GET "/api/notes/fetch_notes" login required(i.e in header auth_token is must and content type)
router.get('/fetch_notes',fetchuser,async (req,res)=>{           // async and await banana mtt bhulna and fetchuser will be used here
    try{
        const notes = await Notes.find({user: req.user.id}); // Notes find karo konse user ke hain (🛑now in Notes schema we have to define user)
        res.json(notes);                                                      //🛑 to check particular use ""req.user.id"" which comes from fetchuser func🛑 
    }
    catch(error){
         console.error(error.message);
         res.status(401).json('Interval server error');
    }
    
})


//ROUTES2️⃣ Add a new notes using : Post "/api/notes/add_note" login required
router.post('/add_note',fetchuser,[
 body('title','enter a valid title must of 3 character').isLength({min:3}),                     //applied the validator
 body('description','enter valid description as it contain atleast 5 character').isLength({min: 5})
],
 async (req,res)=>{
   
    try{
        const errors = validationResult(req);                    //same show the error if not validation
        if (!errors.isEmpty()) {   
            return res.status(400).json({ errors: errors.array() });                                                       
        }

        const {title,description,tag}=req.body;                    // get the user content form body where requested
        const note = new Notes({                                    // created note of that related to particular user
            title,description,tag,user: req.user.id                  //🛑 to check particular use ""req.user.id"" which comes from fetchuser func🛑
        });

        const saved_note = await note.save();                        // saved that note
        res.json(saved_note);
    }
    catch(error){
        console.error(error.message);
        res.status(401).json('Interval server error');
    }
 })


 //ROUTES3️⃣ Update existing notes using : Put "/update/:id" login required
 router.put('/update/:id',fetchuser,
 async (req,res)=>{
     
    //getting updation from user
    let {title,description,tag}= req.body;   
    
    try{  
        //adding updation in newnote
        let newnote = {};
        if(title){newnote.title = title};
        if(description){newnote.description = description};
        if(tag){newnote.tag = tag};

        //getting note(which is to be update) from users id(from/update/"id") who is updating
        let note = await Notes.findById(req.params.id);
        if(!note){ return res.status(404).send("NOT found")}

        //checking note(which is to be update) is updating by correct user ((   note.user.toString() --> give id of note's user  and  req.user.id ----> gives id of login user   ||| now here is checking this match or not))
        if(note.user.toString()!==req.user.id)
        {
            return res.status(404).send("NOT Allowed");
        }
    
        // if all set,then updating the existing note
        note = await Notes.findByIdAndUpdate(req.params.id,{$set: newnote},{new:true})

        res.json({note});
    }
    catch(error){
        console.error(res.message);
        res.status(401).json("Internal server error");
    }

 })


 //ROUTES4️⃣ deleting existing notes using : delete "/delete_note/:id" login required
 router.delete('/delete_note/:id',fetchuser,
  async (req,res)=>{

    try{
        // jis note ko delete krna hai usko uski id se uthaya
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("NOT found")};

        //abh is note ka user hai ---kya wo same hai---jo user isse delete kr raha hai
        if(note.user.toString()!==req.user.id)
        {
            return res.status(404).send("NOT allowed");
        }

        //if all set,then delete note
        note = await Notes.findByIdAndDelete(req.params.id);
    
        res.json({note});
    }
    catch(error){
        console.error(res.message);
        res.status(401).json("Internal server error");
    }

  })

module.exports = router;