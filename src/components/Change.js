
import '../css/change.css';
import { useState } from "react";
import { Navigate } from "react-router-dom";

const Change = (props) => {

    const [inputFields, setInputFields] = useState({
        contents: props.post.contents,
      });

    function getInput(event){
        setInputFields({
            ...inputFields,
            [event.target.name]: event.target.value,
        })
    }

    function onPress(e){

        e.preventDefault();

        const post = {

            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify({ 
                id: props.post.id,
                userid: props.post.userid,
                contents: inputFields.contents,
                parentid: props.post.parentid
            })
        };

        fetch('http://catstagram.lofty.codes/api/posts/?format=api', post);
        window.location.reload();
    }

    return (
        <>
            <div className="blur"></div>

            <section className="changeScreen">
                <h1>Change Message</h1>

                <form>
                    <textarea required id="contents" name="contents" 
                    rows="5" cols="80" placeholder="revise text" 
                    onChange={getInput} value ={inputFields.contents}></textarea>

                    <br></br><br></br>
                    <button type="submit" value="Save" onClick={onPress}>Save</button>
                </form>

            </section>
        </>
    );
}

export default Change;