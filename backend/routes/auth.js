const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
   let obj={
        a: 'abald',
        number: 3
    }
    res.json(obj);
})


module.exports=router;