import { useState } from "react"; 

/*
@param {*} props 
* @returns 
*/
const UpdateAboutMe = props => {

   const API_URL = "http://localhost:8000";

   const [aboutMeText, setaboutMeText] = useState("");

   /**
    * Change aboutMeText on keystroke
    * @param {*} e 
    */
   function handleChange(e) {
       setaboutMeText(e.target.value);
   }

   /**
    * Submit the updated bio (about me) information
    */
   async function submitUpdatedAboutMe() {
       const newAboutMe = {
           "aboutMe": aboutMeText
       }

       await fetch(`${API_URL}/profiles/${props.id}/about`,
           {
               method: 'PUT',
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify(newAboutMe)
           }).then(window.location.reload());
           
   }


   return (
       <div className="update-aboutMe-area">
           <label htmlFor="aboutMeText">About Me (150 characters max):</label><br></br>
           <textarea type="text" id="aboutMeText" name="aboutMeText" minLength="0" maxLength="150" rows="5" cols="50" onChange={handleChange}></textarea><br></br>
           <button value="submit" id="submitButton" onClick={submitUpdatedAboutMe}>Submit</button>
       </div>
   );
}

export default UpdateAboutMe;