import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup() {

  const [Credential,setCredential]=useState({name:"",email:"",password:"",cpassword:""});
  const navigate = useNavigate();

  const handlechange=(e)=>{
     setCredential({...Credential,[e.target.name]: e.target.value})
  }

  const handlesubmit=async(e)=>{
     e.preventDefault();
     const {name,email,password} =  Credential;
     const response = await fetch("http://localhost:5000/api/auth/createuser",{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },

            body: JSON.stringify({name,email,password})
      })

      const json = await response.json();
      console.log(json);

      if(json.success){
        localStorage.setItem("token",json.authtoken);
        navigate('/');
      }
      else{
        alert(" please enter correct credentials");
      }
  }


  return (
    <div className='container'>
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name'  onChange={handlechange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email'  onChange={handlechange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password'  onChange={handlechange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword'  onChange={handlechange} minLength={5} required/>
        </div>
       
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
