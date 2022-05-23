import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import '../css/register.css';

// Functional component for User Registration
function Register({ currentUserId }) {
    const [registerSuccess, setSuccess] = useState(false);

    // Contains fields for User input
    const [inputFields, setInputFields] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
      
    });
    // Handles input event for User fields/registration
    function getInput(event) {
        setInputFields({
            ...inputFields,
            [event.target.name]: event.target.value,
        });
    }

    //insert fetch call
    async function submitNewUser(event) {
        // Stop default form submission event
        event.preventDefault();

        // Register user
        let userInfo = {
            email: inputFields.email,
            password: inputFields.password,
            firstName: inputFields.firstName,
            lastName: inputFields.lastName,
            
        };
        // Submit info to server
        await fetch("http://catstagram.lofty.codes/api/users/register/?format=api", {
            headers: {
                "content-type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(userInfo),
        })
            .then((response) => response.json());
        //.then((data) => console.log(data));

        // Decide on redirection or auto login here =====
        setSuccess(true);

    }
    //need to check if user is logged in. if so, navigate to user profile.
    return window.localStorage.getItem("userId") > 0 ? (
        <Navigate to="/login" />
    ) : registerSuccess ? (
        <Navigate to="/login" />
    ) : (
        <>
            <div id="registration-page">
                <div id="registration-data">
                    <h1>Registration</h1>

                    <form onSubmit={submitNewUser}>
                        <div className="regForm">
                            
                            {/* Email Field */}
                            Email:{" "}
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={inputFields.email}
                                onChange={getInput}
                                required
                            />
                            <br />
                            <br />
                            {/* Password Field */}
                            Password:{" "}
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={inputFields.password}
                                onChange={getInput}
                                required
                            />
                            <br />
                            <br />
                            {/* First Name Field */}
                            First Name:{" "}
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={inputFields.firstName}
                                onChange={getInput}
                                
                            />
                            <br />
                            <br />
                            {/* Last Name Field */}
                            Last Name:{" "}
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={inputFields.lastName}
                                onChange={getInput}
                                
                            />
                            <br />
                            <br />

                            
                        </div>
                        <div className="button">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;