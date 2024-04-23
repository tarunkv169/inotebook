

const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');        // 1. npm install express-validator  2. this line
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


const JWT_SECRET ='tarunisagoodbody';

const fetchuser = require("../middleware/fetchuser");


// router.post('/', (req, res) => {
//     console.log(req.body);
//     const user = User(req.body);
//     user.save();
//     res.send(req.body);
// });



//ROUTES1️⃣     CREATE THE USER USING : POST "/api/auth/createuser"   no login required

router.post('/createuser', [ 
    body('name','enter a valid name').isLength({ min: 3 }),                                   //3. check invalidity
    body('email','enter a valid email').isEmail(),
    body('password','password must be atleast 5 character').isLength({ min: 5 }), 
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {                                                           // 4. showing error if wrong
          return res.status(400).json({ errors: errors.array() });
        }

        // res.send(req.body);
    // User.create({
    //     name: req.body.name,                                                                     // 5. data to store in database
    //     email: req.body.email,
    //     password: req.body.password,
    //   })
    
    //     .then(user => res.json(user))
    //     .catch(err=> {console.log(err)                                                            // 6. to stop duplicacy of data "add inotebook in mongoURI"  and "add user.createIndexes in User.js"
    //     res.json({error: 'please enter a unique value for email',message: err.message})})


    // checking wether user with email exists already
    try{
        let user = await User.findOne({email: req.body.email})
        if(user)
        {
          return res.status(400).json({error: 'sorry user with this email already exists'})
        }
        
        const salt = await bcrypt.genSalt(10);
        const rbp = await bcrypt.hash(req.body.password,salt);
        user = await User.create({
              name: req.body.name,                                                                     
              email: req.body.email,
              password: rbp,
            })

        const data={
          user:{
            id: user.id
          }
        }

        const authtoken = jwt.sign(data,JWT_SECRET);

        res.json({authtoken});
        // res.json(user);
        // res.json(rbp);
    }
    catch(error){
           console.error(error.message)
           res.status(500).send("Interval server error");
    }

  });






//ROUTES2️⃣     AUTHENTICATE A USER(i.e user put its email and password,,,,the backend will check he put write email or password that he has login in this app) 
    //           USING : Post "/api/auth/login"  no login required
    router.post('/login',[
      body('email','invalid email').isEmail(),
      body('password','password must containe atleast 5 characters').isLength({min: 5})
    ],
    async (req,res)=>{

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  

      const {email,password} = req.body;              //⬇️ on body window ,we req user's email & password and store that  in var(email,password)
      try{
         const user = await User.findOne({email});                              // ➡️find the email
         if(!user)                                                              // if this email not exits
         {
             return res.status(400).json({error: "please enter the correct login credentials"});
         }
          
         const password_compare = await bcrypt.compare(password,user.password); // ➡️compare the password by bcrpyting from salt 
         if(!password_compare)                                                  // if password not exits
         {
            return res.status(400).json({error: "please enter the correct login credentials"});
         }
         
         const data={
          user:{
              id: user.id
          }
         }

         const authtoken = jwt.sign(data,JWT_SECRET);
        
         res.json({authtoken});
         
      }
      catch(error){
           console.error(error.message);
           res.status(500).send('Interval server error');
      }

});





//ROUTES3️⃣    GET LOGGEDIN USER DETAILS USIGN : post "/api/auth/getuser"  login required

router.post('/getuser',fetchuser,

   async (req,res)=>{
     
     try{
         const userid = req.user.id;
         const user = await User.findById(userid).select("-password");

         res.send(user);
    }
    catch(error){
      console.log(error.message);
      res.status(500).json("Internal server error");
    }


})


module.exports = router;
