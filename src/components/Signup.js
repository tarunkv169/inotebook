import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {

  const [Credential,setCredential]=useState({name:"",email:"",password:"",cpassword:""});           // same as login just here (/createuser) is used and get the user(name,cpassword extra)
  const navigate = useNavigate();

  const handlechange=(e)=>{
     setCredential({...Credential,[e.target.name]: e.target.value})
  }

  const handlesubmit=async(e)=>{
     e.preventDefault();
     const {name,email,password} =  Credential;                                                 // we can do like this also
     const response = await fetch("http://localhost:5000/api/auth/createuser",{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },

            body: JSON.stringify({name,email,password})                                        //⬆️then here simpley write
      })

      const json = await response.json();
      console.log(json);

      if(json.success){
        localStorage.setItem("token",json.authtoken);
        props.showalert("Signup successfully","success");
        navigate('/');
      }
      else{
        props.showalert("Invalid details","danger");
      }
  }


  return (
    <div className='container my-4 mx-1'>
      <h2>Create an account to use iNotebook</h2>
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
