import React, { useState } from 'react';
import "../index.css";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const loginHandle = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch(`http://localhost:5000/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password,
                }),
            });

            const login = await response.json();
            if (response.ok) {
                localStorage.setItem("token", login.authtoken);
                alert("Login successful!");
                navigate("/Intro");
            } else {
                alert(login.message || "Login failed");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Something went wrong. Please try again.");
        }
    };
    return (
      <div className='login-back '>
        <div  className="container  d-flex flex-column align-items-center mt-4">
          <h2 className="text-center text-dark mb-5 fs-1" style={{marginTop:'100px'}}>Login to Continue with NoteCraft</h2>

          <form className=" p-4 form-login  rounded-4 " style={{ width: '400px', boxShadow: '60px 70px 99px 100px rgba(10, 0, 30, 0.25)' }} onSubmit={loginHandle}>
            <div className="mb-3 w-100">
              <label htmlFor="email" className="form-label text-dark">Email address</label>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                name="email" 
                value={credentials.email} 
                onChange={onChange} 
                required 
              />
              <div id="emailHelp" className="form-text text-dark">We'll never share your email.</div>
            </div>
            
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-dark">Password</label>
              <input 
                type="password" 
                className="form-control  " 
                id="password" 
                name="password" 

                value={credentials.password} 
                onChange={onChange} 
                required 
              />
            </div>
    
            <button
              type="submit"
              className="btn login-btn btn-dark w-100"
             
            >
              Login
            </button>
          </form>
        </div>
        </div>
      );
    };
    
    export default Login;

    