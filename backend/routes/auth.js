

const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');        // 1. npm install express-validator  2. this line


// router.post('/', (req, res) => {
//     console.log(req.body);
//     const user = User(req.body);
//     user.save();
//     res.send(req.body);
// });



// CREATE THE USER USING : POST "/api/auth/createuser"   no login required

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

        user = await User.create({
              name: req.body.name,                                                                     
              email: req.body.email,
              password: req.body.password,
            })
    }
    catch(error){
           console.error(error.message)
           res.status(500).send("some error has occured");
    }


});

module.exports = router;
