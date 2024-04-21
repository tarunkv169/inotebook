
// this is used to connecting to our database using mongoURI of mongodb compass

const mongoose = require('mongoose');
const mongoURI="mongodb://localhost:27017/inotebook?directConnection=true&tls=false&readPreference=primary"


const connectToMongdb=async()=>{
    try{
        await mongoose.connect(mongoURI);
        console.log("connect to mongodb successfully")
  
    }catch(error){
        console.error("couldn't connect to mongodb")
    }
}


module.exports = connectToMongdb;