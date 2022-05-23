import React, { useEffect } from "react";
import blankLike from './../images/BlankLikeGGs.png'
import { useState } from "react";
import blankDislike from './../images/BlankDislikeGGs.png'
import filledDislike from './../images/FilledDislikeGGs.png'
import filledLike from './../images/FilledLikeGGs.png'
/*
    Variables needed fromparent component to work are:
    likeToChild ==  likes of current post
    postIdToChild == the current posts id
    contentToChild == This one is needed for the backend to put to the database depending on how put method on backend is performed this may or may not be necissary
    userIdToChild == this is the current user logged in id to create a connection on database between user and posts so the program knows who has liked it
    postUserIdToChild == this is needed to get the posters user id to put in the database to get who is getting what points from likes
*/


export default function Like(likeToChild){
    const [on, setOn] = useState('');
    const [off, setOff] = useState('');
    const[like, setLike] = useState(likeToChild.likeToChild);
    const[dImage, setDImage] = useState(blankDislike);
    const[lImage, setLImage] = useState(blankLike);
    const[likesId, setLikesId] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [postUserId] = useState(likeToChild.postUserIdToChild)
    const currentuserid = likeToChild.userIdToChild;
    
    // this function updates the current amount of likes or dislikes made to a post
        function submitLike(likes){ 
            const post ={
                id : likeToChild.postIdToChild,
                contents: likeToChild.contentToChild,
                likes : likes,
                userid : likeToChild.postUserIdToChild,
                parentid: likeToChild.parentIdToChild,

            };
            const postJSON =JSON.stringify(post);
        
            // For not multi computer enviroment Change 192.168.1.126 =>localhost
            // if multi computer enviroment change 192.168.1.126 to what you have as you network gateway
            const response= fetch(`http://localhost:8081/post`,{ 
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                },
                body:postJSON,
            });
            if(response.status == 200){
                alert("submitted")
            }

            
            
        }
        // this function will update the points a user has based on if it has been liked or disliked
        function pointUpdate(option){ 
            
            
            const users ={
                points: option,
            }
            const userJSON=JSON.stringify(users);
            // For not multi computer enviroment Change 192.168.1.126 =>localhost! 
            // if multi computer enviroment change 192.168.1.126 to what you have as you network gateway

            fetch(`http://localhost:8000/users/${postUserId}/points`, { 
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:userJSON,
            });

        }

        const userMadeState = (option) =>{
            // checks if state is null so that if the user makes a state connection it will post to Likes table
            
           if(option == 0){ 
               //console.log(likesId);
                //if state is not null then instead of making a new post this will 
                // update the comment based on the id from the likes table 
                // earlier recieved on load check lines 110 114 or 119 for more information
               
                // For not multi computer enviroment Change 192.168.1.126 =>localhost! 
                // if multi computer enviroment change 192.168.1.126 to what you have as you network gateway
                
                fetch(`http://localhost:8081/likes/${likesId}`,{
                    method:"DELETE",
                    });
                

            }else if(option == 1 || 2){
                const state = option;
                const likestate ={
                    userid : likeToChild.userIdToChild,
                    postid : likeToChild.postIdToChild,
                    like_state: state,
                }
                const likestateJSON = JSON.stringify(likestate);
                // For not multi computer enviroment Change 192.168.1.126 =>localhost! 
                // if multi computer enviroment change 192.168.1.126 to what you have as you network gateway
                fetch("http://localhost:8081/likes", { 
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:likestateJSON,
                })
                .then(response =>response.json())
                .then (data => setLikesId(data.id));
                



            }
        }

        
        //passes the current user id into the function to make a fetch call based on user id
        function isState(currentuserid){
            if(!isLoaded){
                // makes a fetch call to table posts where current user id is found and pulls out all posts user has a state with
                fetch(`http://localhost:8081/likes/${currentuserid}`) 
                .then(response => response.json())
                .then(data => checkState(data));
                function checkState(i){
                    for (let j = 0;j < i.length; j++ ){
                    
                    if(i[j].like_state === 1 && i[j].postid === likeToChild.postIdToChild){ 
                        //if state is one then like is filled. Dislike will empty and state On is true
                        setLImage(filledLike);
                        setDImage(blankDislike);
                        //gets the id from Likes table to make a put method based on the id from the likes table later
                        setLikesId(i[j].id)
                        setOn(true)
                        setIsLoaded(true);
                        

                    }else if(i[j].like_state === 2 && i[j].postid === likeToChild.postIdToChild){ 
                        // console.log(i)
                        //if state 2 is on like is blank. Dislike is filled and state off is true
                        setLImage(blankLike);
                        setDImage(filledDislike);
                        //gets the id from Likes table to make a put method based on the id from the likes table later
                        setLikesId(i[j].id);
                        setOff(true)
                        setIsLoaded(true);
                        

                    }
                }
            }
               
            }else{}
            
        }

    
    
    const parentToChild = (likes) =>{
            if(on){ // checks if state on is true if it is then it will fill like image if not will unfill like image
            
            pointUpdate(-1);// updates points on user table by subtracting 1
            
            userMadeState(0);// sets the default state of the likes table to be 0 so that both images will be made blank on start
            
            likes--;//subtracts likes by 1

            setLike(likes);//Sets state Like and adds the current value of likes to be the current value

            setOn(false); //Sets state On to be false so if button is clicked again it will fill the button

            setLImage(blankLike); //sets image to be blank like image

            submitLike(likes);// calls function submitLike to pass value of likes

            }else{
                pointUpdate(1);// updates points by 1 on user table 

                userMadeState(1);// sets state to 1 so on Likes table to that it is stored that the picture is filled

                likes++;// increments likes by 1

                setLike(likes); // Sets state Likes to be the new incremented value of likes

                setOn(true); // sets state On to true so that filled is set on

                setLImage(filledLike); // sets the like image to be filled

                submitLike(likes); // calles function SubmitLike to have the value of likes 

                if(off){// checks if state off is true if it is it will decrement likes by 1 and set the dislike picture to be blank
                    parentToMinusChild(likes);
                }      
            }    
        }
    const parentToMinusChild = (likes) =>{
        
        if(off){// checks if like state is on or not 
            
            pointUpdate(1);// calls pointUpdate function sending one there to add 1 to points
            
            userMadeState(0);// calls userMadeState function so and sets it to 0 so both like and dislike our 0
            
            likes++;// increments curren likes from post table so that it can be stored with like plus one or in this case turning off the dislike state
            
            setLike(likes);// sets state like to be the value likes from the prior increment
            
            setOff(false);// sets state off to false so if dislike is pressed again it will know that it is in empty state
            
            setDImage(blankDislike);//sets image of dislike to be blank
            
            submitLike(likes);// calls function submit likes to fetch a put update into backend
            
            }else{
               
                pointUpdate(-1); // calls point update and puts a value of -1 to subtract 1 from the points of the user
                
                userMadeState(2);// sets the state to 2 so the user has a connection of 2 on table Likes to be disliked on start
                
                likes--;//subtracts 1 from the current value of likes
                
                setDImage(filledDislike);// sets the dislike image to be filled
                
                setOff(true);// sets state off to be true
                
                setLike(likes);  // sets state Like to the value of likes deincremented  
                
                submitLike(likes); //calls function submitLike to store the value of current Likes 
                if(on){
                    //if state on is on it will look at the like button to check for if the button has been 
                    //liked if it has it will deincrement the number by 1 and turn off the state of like.
                     parentToChild(likes);
                   
                }
            }   
    }
    return(
        <>
           
            {/* Pages starts here then passes the current user into isState to check if the use has liked a post before*/}
            {isState(currentuserid)}
            
            <span >
                {/*passes the prop like to parentToMinusChild function to check state of dislike button */}
                <img src = {dImage} id = "images" onClick = {() => parentToMinusChild(like)}></img>
                {/*passes the prop like to parentToMinusChild function to check state of like button */}
                <img src ={lImage} id = "images" onClick = {() => parentToChild(like)}></img> 
                {like}  
            </span>

        </>
    );
}