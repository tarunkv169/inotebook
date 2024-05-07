import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function Login() {                                                     
  
  const [Credential,setCredential]=useState({email:"",password:""});                 //9️⃣.3️⃣ credential initalize with empty email and password
  const navigate = useNavigate()


  const handlechange=(e)=>
  {
    setCredential({...Credential,[e.target.name]: e.target.value});                  //9️⃣.4️⃣ when user write(email,password) setCredetial will fill credential with that using onChangefunc
  }


  const handlesubmit=async(e)=>                                                      //9️⃣.5️⃣ when do submit(onSubmitfunc will run)----fetch login detail from database--then match--
  {
     e.preventDefault();
     const response = await fetch("http://localhost:5000/api/auth/login",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },

          body:JSON.stringify({email: Credential.email,password: Credential.password})
     })

     const json = await response.json();
     console.log(json);
                                                                                    //------------------->9️⃣.6️⃣ go to backend>routes>auth 
     if(json.success){                                                              //🔚9️⃣.7️⃣ if true then store authtoken and navigate to our (/ or Home)  <-----------from auth.js
       localStorage.setItem("token",json.authtoken)
       navigate('/')
     }
     else{
       alert("Invalid user");
     }
  }
  
  return (                                                                   // 9️⃣.2️⃣inserting form and creating 🛑onChangefunc(in input)  and 🛑onSubmitfunc(in form)   <----------from App.js                   <-------------from App.js
    <div className='container my-4 mx-1'>
      <form onSubmit={handlesubmit}>                    
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email'  onChange={handlechange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={handlechange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
