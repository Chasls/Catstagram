import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import Like from "../hooks/Like";
import Change from "./Change";
import Delete from "./Delete";
import GGReply from "./GGReply";
import CreatePost from "./CreatePost";

import '../css/App.css';
import '../css/like.css';
import '../css/post.css';


export default function Post(props) {

    const readyPostList = []
    const [rawPostList, setRawPostList] = useState([])
    const [rawUserList, setRawUserList] = useState([])
    
    useEffect(() => {
        if (rawPostList.length === 0) {
            fetch("http://localhost:8081/post").then(resp => resp.json()).then(data => setRawPostList(data))
        }
        
    }, [rawPostList])

    useEffect(() => {
        if (rawUserList.length === 0) {
            fetch("http://localhost:8000/users").then(resp => resp.json()).then(data => setRawUserList(data))
        }
        
    }, []) 

    const getCommentsByParentId = (id) => {
        const commentList = []
        rawPostList.forEach(element => {
            if (element.parentid == id) {
                let username = ""
                for (let j = 0; j < rawUserList.length; j++) {
                    if (rawUserList[j].id == element.userid) {
                        username = rawUserList[j].username
                        break;
                    }
                }
                commentList.push(
                    <li key={element.id}>
                        <article  className="comment" >
                            <div id={"comment" + element.id} >
                                <div className="flex-container post-header">
                                    <h4>{username}</h4>
                                    <h4>{element.post_time}</h4>
                                </div>
                                <p>{element.contents}</p>
                                <div className="flex-container">
                                    <Delete post = {element} auth = {props.currentUserId}></Delete>
                                    <Like likeToChild={element.likes} postIdToChild={element.id} contentToChild={element.contents} userIdToChild={props.currentUserId} postUserIdToChild={element.userid} parentIdToChild={element.parentid}/>
                                    <Popup trigger={<button>Reply</button>} modal nested>
                                        <GGReply userid ={props.currentUserId} post = {element}/>
                                    </Popup>
                                    {props.currentUserId == element.userid ? 
                                    (
                                    <Popup trigger={<button>Edit</button>} modal nested>
                                        <Change post = {element}/>
                                    </Popup>
                                    ): null}
                                </div>
                            </div>
                        </article>    
                        <ul>{getCommentsByParentId(element.id)}</ul>
                    </li>
                )
            }
        });
        //console.log(commentList)
        return commentList
    }

    const displayPosts = (rawPostList) => {
        for (let i = 0; i < rawPostList.length; i++) {
            try {
                if (rawPostList[i].parentid === 0) {
                    let username = ""
                    for (let j = 0; j < rawUserList.length; j++) {
                        if (rawUserList[j].id == rawPostList[i].userid) {
                            username = rawUserList[j].username
                            break;
                        }
                    }
                    readyPostList.push(
                        <article  key={rawPostList[i].id}>
                            <div className="post" id={"post" + rawPostList[i].id} >
                                <div className="flex-container post-header">
                                    <h4>{username}</h4>
                                    <h4>{rawPostList[i].post_time}</h4>
                                </div>
                                    <p><pre>{rawPostList[i].contents}</pre></p>
                                <div className="flex-container">
                                    <Like likeToChild={rawPostList[i].likes} postIdToChild={rawPostList[i].id} contentToChild={rawPostList[i].contents} userIdToChild={props.currentUserId} postUserIdToChild={rawPostList[i].userid}/>
                                    <Delete post = {rawPostList[i]} auth = {props.currentUserId}></Delete>
                                    <Popup trigger={<button>Reply</button>} modal nested>
                                        <GGReply userid ={props.currentUserId} post = {rawPostList[i]}/>
                                    </Popup>
                                    {props.currentUserId == rawPostList[i].userid ? 
                                    (
                                        <Popup trigger={<button>Edit</button>} modal nested>
                                            <Change post = {rawPostList[i]}/>
                                        </Popup>
                                    ): null}
                                </div>    
                            </div>
                            
                            <ul>{getCommentsByParentId(rawPostList[i].id)}</ul>
                        </article>
                        
                    )
                }
            } catch (e) {
                readyPostList.push(
                    <article id="defaultPost" className="post" key={0}>
                        <h6></h6>
                        <h6></h6>
                        <p></p>
                    </article>
                )
            }
        }
    }
    
    if (rawPostList.length !== 0 && readyPostList == 0) {
        displayPosts(rawPostList)
        //console.log(rawPostList)
    }

    

    return props.currentUserId>0 ?(
        <section id="post-container" className="flex-container">
             <CreatePost username ={props.user} userid={props.currentUserId}/>
            {readyPostList}
        </section>
    )  :( <Navigate to ="/login" /> );
}