import React from 'react';
import GGMessage from "./GGMessage";


const GGPosts = props => {
    const displayPosts = () => {

        return props.post.map(post => {
            return (<GGMessage key ={post.id} usr = {props.username} contents = {post.contents} time = {post.post_time}/>);
        });
    };
    return (<div id="post-container" className="flex-container">{displayPosts()}</div>)
}

export default GGPosts;