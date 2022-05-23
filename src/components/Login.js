import { useState, useEffect } from "react";
import {Navigate} from "react-router-dom";
import '../css/login.css';
import '../css/nav.css';

//component for the user login
function Login({ currentUserId, setCurrentUserId, setUser }) {

    //contains fields for the User input
    const [inputFields, setInputFields] = useState({
        email: "",
        password: ""
    });
    // Handles input event for User fields/registration
    function getInput(event) {
        setInputFields({
            ...inputFields,
            [event.target.name]: event.target.value,

        });
    }


async function loginUser(event) {
    //prevents default from submission event
    event.preventDefault();

    // Register user
    let userInfo = {
        email: inputFields.email,
        password: inputFields.password
    };

    let data = await fetch("http://catstagram.lofty.codes/api/users/login", {
        headers: {
            "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(userInfo),
    })
        .then((response) => response.text());

    if (data != 0) { 
        alert("init");
        window.localStorage.setItem("userId", data);
        setCurrentUserId(data);
        window.localStorage.setItem("email", userInfo.email);
        console.log(userInfo.email);
        console.log("test");
        setUser(userInfo.email);
    } else { alert("Login Failed, Purrr-haps Try Again") }

}

return currentUserId > 0 ? (<Navigate to ={"/profile/" + currentUserId}/>) :(
    <>
    <div id= "login-page">
    <div id="login-data">
      <h1>Login</h1>
      <form onSubmit={loginUser}>
      <br />
      <br />
        {/* Email Field */}
        Email:{" "}
        <input
          type="email"
          name="email"
          placeholder="email"
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
        <br />
        
        <button type="submit">Login</button>
      </form>
      </div>
      </div>
    </>
  );
}

export default Login;
