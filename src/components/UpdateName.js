import { useState } from "react";


const UpdateName = props => {

    const API_URL = "http://localhost:8000";

    const [inputFields, setInputFields] = useState({
        firstNameText: "",
        lastNameText: ""
    });

    /**
     * Update both input fields at once.
     * @param {*} event 
     */
    function getInput(event) {
        setInputFields({
            ...inputFields,
            [event.target.name]: event.target.value,
        });
    }

    /**
     * Submit the updated name(s)
     */
    async function submitUpdatedName() {
        await fetch(`${API_URL}/profiles/${props.id}/name?firstName=${inputFields.firstNameText}&lastName=${inputFields.lastNameText}`,
            {
                method: 'PUT',
                headers: { "Content-Type": "application/json" }
            }).then(window.location.reload());
    }


    return (
        <div className="update-name-area">
            <label htmlFor="firstNameText">First Name:</label><br></br>
            <input type="text" id="firstNameText" name="firstNameText" minLength="0" maxLength="150" rows="5" cols="50" onChange={getInput}></input><br></br>

            <label htmlFor="lastNameText">Last Name:</label><br></br>
            <input type="text" id="lastNameText" name="lastNameText" minLength="0" maxLength="150" rows="5" cols="50" onChange={getInput}></input><br></br>


            <button value="submit" id="submitButton" onClick={submitUpdatedName}>Submit</button>
        </div>
    );
}

export default UpdateName;