var jwt = require('jsonwebtoken');
const JWT_SECRET ='tarunisagoodbody';


const fetchuser =(req,res,next)=>{

    const token = req.header("auth_token");           // we took requested token from header of thunderclient
    if(!token)                                        // if not a token then
    {
        res.status(401).json({error: "please authenticate using a valid token"});
    }

    try{
        const data = jwt.verify(token,JWT_SECRET);                 // verify token with jwt_secret_key; // if it is then store in data
        req.user = data.user;                                      // data saved in req
        next();                                                    // next describe our (req,res) of route in which our fetchdata func will be used
    } 
    catch(error){
        res.status(401).json({error: "please authenticate using a valid token"});
    }

}


module.exports =fetchuser;