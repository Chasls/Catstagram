import { useEffect, useState } from "react";
import Popup from 'reactjs-popup';
import Like from "../hooks/Like";
import Change from "./Change";

import '../css/App.css';
import '../css/Like.css';
import '../css/Post.css';
import '../css/HomePage.css';
import DummyLike from "../hooks/DummyLike";



export default function HomePage() {

    const readyPostList = []
    const [rawPostList, setRawPostList] = useState([])
    const [rawUserList, setRawUserList] = useState([])

    useEffect(() => {
        if (rawPostList.length === 0) {
            fetch('http://catstagram.lofty.codes/api/posts').then(resp => resp.json()).then(data => setRawPostList(data))
        }
    }, [rawPostList])

    useEffect(() => {
        if (rawUserList.length === 0) {
            fetch('http://catstagram.lofty.codes/api/users/?format=api').then(resp => resp.json()).then(data => setRawUserList(data))
        }
        
    }, []) 

    const getCommentsByParentId = (id) => {
        const commentList = []
        rawPostList.forEach(element => {
            if (element.parentid == id) {
                //console.log(element)
                commentList.push(
                    <li key={element.id}>
                        <article  className="comment" >
                            <div id={"comment" + element.id} >
                                <div className="flex-container post-header">
                                    <h5>{element.userid}</h5>
                                    <h5>{element.post_time}</h5>
                                </div>
                                <p>{element.content}</p>
                                <div className="flex-container">
                                    <Like />
                                    <Popup trigger={<button>Edit</button>} modal nested>
                                        <Change post = {element}/>
                                    </Popup>
                                </div>
                            </div>
                        </article>    
                        <ul>{getCommentsByParentId(element.id)}</ul>
                    </li>
                )
            }
        });
        return commentList
    }

    const displayPosts = (rawPostList) => {
        for (let i = 0; i < 5; i++) {
            try {
                if (rawPostList[i].parentid === 0) {
                    let email = ""
                    for (let j = 0; j < rawUserList.length; j++) {
                        if (rawUserList[j].id == rawPostList[i].userid) {
                            email = rawUserList[j].email
                            break;
                        }
                    }
                    readyPostList.push(
                        <article  key={rawPostList[i].id}>
                            <div className="post" id={"post" + rawPostList[i].id} >
                                <div className="flex-container post-header">
                                    <h4>{email}</h4>
                                    <h4>{rawPostList[i].post_time}</h4>
                                </div>
                                    <p>{rawPostList[i].contents}</p>
                                <div className="flex-container"> 
                                    <DummyLike />
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

    return (
        <>
            <h1 class="title">Welcome!</h1>
            <div class="box">
                {readyPostList}
            </div>
            <div class="fixedright display">
                <div class="minoritem">
                    <h2>GOGATO</h2>
                    <h4>Cat... chup with the world!</h4>
                </div>
            </div>

        </>
    )
}