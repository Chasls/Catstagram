import { Link, Navigate } from "react-router-dom";


export default function Navbar({ currentUserId, setCurrentUserId, setUser }) {

      checkUser();

      function checkUser(){
            if (window.localStorage.getItem("userId") >= 0){

              setCurrentUserId(window.localStorage.getItem("userId"));
              setUser(window.localStorage.getItem("email"));
            }
            else {
              setCurrentUserId(0);
              setUser(0);
            }
      }

      // Handles event when logout button is pressed
    function logout() {
    window.localStorage.clear();          // Clear storage
    setCurrentUserId(0);  // Update state for re-rendering
    setUser(0);           // Update state for re-rendering
  
    return <Navigate to="/login" />;      // Go back to login component
  }

  // If someone is logged in, link to relevant components. Otherwise, link to login and registration
  return currentUserId > 0 ? (
    <>

        <div className="nav-flex-container">
          <div className="left"><img alt="GG Logo" src=''></img></div>

        <div className="right">
          <div className="flex-item"><Link to={"/profile/"+ currentUserId}>Settings</Link></div>
          <div className="flex-item"><Link to="/myposts">Posts</Link></div>
          <div className="flex-item"><Link to="/trends">Trends</Link></div>
          <div className="flex-item"><Link to="/timeline">Timeline</Link></div>
          <div id="logout"className="flex-item"><button className='logout'  onClick={logout}>Log Out</button></div>
          </div>
        </div>
        </>
  ) : (
    <>
      <div className="nav-flex-container">
          <div className="left"><img alt="GG Logo" src=''></img></div>
          <div className="flex-item"><Link to="/">Home</Link></div>

          <div className="right">
            <div className="flex-item"><Link to="/login"> Login</Link></div>
            <div className="flex-item"><Link to="/registration"> Register</Link></div>
          </div>
      </div>
    </>
  );
}
