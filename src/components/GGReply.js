import { useState } from "react";


const GGReply = (props) => {

    const [inputFields, setInputFields] = useState({contents: ""});

    function getInput(event){
        setInputFields({...inputFields, [event.target.name]: event.target.value,})
    }

    async function onPress(e){

        e.preventDefault();

        const post = {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify({ 
                userid: props.userid,
                contents: inputFields.contents,
                parentid: props.post.id
            })
        };

        await fetch(`http://localhost:8081/post/create`, post);
        window.location.reload();
    }

    return (
        <>
            <div className="blur"></div>
            <section className='changeScreen'>
                <h1>Reply</h1>

                <form>
                    <textarea required id="contents" name="contents" 
                    rows="5" cols="80" placeholder="revise text" 
                    onChange={getInput} value ={inputFields.contents}></textarea>

                    <br></br><br></br>
                    <button type="submit" value="Save" onClick={onPress}>Post</button>       
                </form>
            </section>
        </>
    );
}

export default GGReply;