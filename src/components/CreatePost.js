import React, { useState } from 'react'

const CreatePost = (props) => {

   const [postContent, setPostConent] = useState("");

   const handleSubmit = e => {
      e.preventDefault();

      fetch("http://catstagram.lofty.codes/api/posts/?format=api", {
         method: "POST",
         mode: "cors",
         body: JSON.stringify({ contents: postContent, likes: 0, userid: props.userid, parentid: 0 }),
         headers: {
            "Content-type": "application/json"
         },
      })
         .then(res => res.json())
         .then(window.location.reload())
   }

   const handleChange = e => {
      setPostConent(e.target.value)
   }

   return (
      <>
         <form onSubmit={handleSubmit} className="center">
            <p><label htmlFor="post input"><h3>What would you like to share? 📝</h3></label></p>
            <p><input className="center" type="textarea" name={postContent} onChange={handleChange} autoFocus ></input></p>
            <p><input type="submit" name="Create Post" value="Create Post" ></input></p>
         </form>
      </>
   )
}

export default CreatePost