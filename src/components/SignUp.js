import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        bio:"",
        cpassword: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });

        if (e.target.name === "cpassword") {
            if (e.target.value !== credentials.password) {
                setErrorMessage("Passwords do not match!");
            } else {
                setErrorMessage("");
            }
        }
    };

    const signupHandle = async (e) => {
        e.preventDefault();

        if (credentials.password !== credentials.cpassword) {
            setErrorMessage("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/auth/createuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    bio: credentials.bio,
                    password: credentials.password,
                }),
            });

            const signup = await response.json();
            console.log(signup);

            if (response.ok) {
                alert("User created successfully!");
                localStorage.setItem("token", signup.authtoken);
                navigate("/");
            } else {
                const errorMsgs = signup.errors?.map(err => err.msg).join("\n") || signup.message || "Signup failed.";
                alert(errorMsgs);
            }
        } catch (error) {
            console.error("Error during signup:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="signup-back d-flex justify-content-center align-items-center" >

            <div className="container d-flex flex-column align-items-center mt-4">
                <h3 className="mb-3 text-center text-white fs-1" style={{ marginTop: '100px' }}>SignUp to iNoteBook</h3>

                <form onSubmit={signupHandle} className="signup-form p-4 rounded-4" style={{ width: '400px', background: "#1c1c1c",marginBottom:'300px' }}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label text-white">User Name</label>
                        <input
                            type="text"
                            className="form-control text-light bg-dark"
                            id="name"
                            name="name"
                            value={credentials.name}
                            onChange={onChange}
                            required
                            autoComplete="name"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label text-light">Email address</label>
                        <input
                            type="email"
                            className="form-control text-light bg-dark"
                            id="email"
                            name="email"
                            value={credentials.email}
                            onChange={onChange}
                            required
                            autoComplete="email"
                        />
                        <div className="form-text text-light">
                            We'll never share your email with anyone else.
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label text-light">Password</label>
                        <input
                            type="password"
                            className="form-control text-light bg-dark"
                            id="password"
                            name="password"
                            value={credentials.password}
                            minLength={5}
                            onChange={onChange}
                            required
                            autoComplete="new-password"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label text-light">Confirm Password</label>
                        <input
                            type="password"
                            className={`form-control ${errorMessage ? "is-invalid" : ""} text-light bg-dark`}
                            id="cpassword"
                            name="cpassword"
                            value={credentials.cpassword}
                            minLength={5}
                            onChange={onChange}
                            required
                            autoComplete="new-password"
                        />
                        {errorMessage && (
                            <div className="invalid-feedback">{errorMessage}</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="bio" className="form-label text-light">Add Your Bio</label>
                        <input
                            type="text"
                            className="form-control text-light bg-dark"
                            id="bio"
                            name="bio"
                            value={credentials.bio}
                            minLength={5}
                            onChange={onChange}
                            required
                            autoComplete="new-password"
                        />
                    </div>

                    <button type="submit" className="btn btn-dark w-100">
                        Sign Up
                    </button>
                </form>
            
            </div>
          
        </div>
    );
};

export default SignUp;
