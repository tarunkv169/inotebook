const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//ROUTES1️⃣ FETCH/GET ALL NOTES OF PARTICULAR USER USING : GET "/api/notes/fetch_notes" login required(i.e in header auth_token is must and content type)
router.get('/fetch_notes',fetchuser,async (req,res)=>{           // async and await banana mtt bhulna
    try{
        const notes = await Notes.find({user: req.user.id}); // Notes find karo konse user ke hain (🛑now in Notes schema we have to define user)
        res.json(notes);
    }
    catch(error){
         console.error(error.message);
         res.status(401).json('Interval server error');
    }
    
})


//ROUTES2️⃣ Add a new notes using : Post "/api/notes/add_note" login required
router.post('/add_note',fetchuser,[
 body('title','enter a valid title must of 3 character').isLength({min:3}),
 body('description','enter valid description as it contain atleast 5 character').isLength({min: 5})
],
 async (req,res)=>{
   
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {   
            return res.status(400).json({ errors: errors.array() });                                                       
        }

        const {title,description,tag}=req.body;
        const note = new Notes({
            title,description,tag,user: req.user.id
        });

        const saved_note = await note.save();
        res.json(saved_note);
    }
    catch(error){
        console.error(error.message);
        res.status(401).json('Interval server error');
    }
 })
module.exports = router;