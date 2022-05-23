
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import './App.css';
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import HomePage from "./components/HomePage";

import './css/nav.css';



function App() {
  const [currentUserId, setCurrentUserId] = useState(0); // Tracks current user Id, along with localstorage in login/registration components
  const [user, setUser] = useState(0);
  return (
    <BrowserRouter>
      <Navbar
        currentUserId={currentUserId}
        setCurrentUserId={setCurrentUserId}
        setUser={setUser}
      />

      <Routes>

        <Route
          path="/registration"
          element={<Register currentUserId={currentUserId} />}
        />
        <Route
          path="/login"
          element={
            <Login
              currentUserId={currentUserId}
              setCurrentUserId={setCurrentUserId}
              setUser={setUser}
            />
          }
        />

        <Route exact path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
