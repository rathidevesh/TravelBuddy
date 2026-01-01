import React, { useState } from 'react'
import { useNavigate} from "react-router-dom";
import './Login.css';

export default function Login(props) {
    const [credentials ,setCredentials]= useState({email:"",password:""})
    let history = useNavigate(); 

    const handleSubmit= async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json"
             
            },
            body: JSON.stringify({email:credentials.email ,password :credentials.password}) 
          });
          const json = await response.json()
          console.log(json);
          if(json.success){
            // save the auth-token and redirect
            localStorage.setItem('token', json.authToken);
            localStorage.setItem('id', json.id);
            props.showAlert(" Account Created Successfully " ,"success")
            history("/home");
          }
          else{
            alert("Invalid Credentials")
            props.showAlert("Invalid Credentials" ,"danger")
          }
    }

    const onChange = (e)=>{
        setCredentials({
            ...credentials ,[e.target.name]:e.target.value
        })
    }

    
  return (
    <>
    <div  className='loginimg'>
      <h2>Login to continue to TravelBuddy</h2>
    </div>

    <div className="loginbody">
        <div class="row my-7">
        <div class="card2 mx-4 ">
            <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="email" value={credentials.email}  onChange={onChange} name="email" aria-describedby="emailHelp"/>
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password"/>
              </div>
              <button type="submit" className="btn btn-outline-light" >Login</button>
              </form>
        </div>
        </div>
        </div>
        
    </div>
    

    </>
  )
}
