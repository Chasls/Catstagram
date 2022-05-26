import React from 'react';
import GGMessage from "./GGMessage";

const GGPosts = props => {
    const displayPosts = () => {

        return props.post.map(post => {
            
            if (post.contents.toLowerCase().includes(props.hashtag.toLowerCase())) 
                return (<GGMessage key ={post.id} contents = {post.contents} time = {post.post_time}/>);

            else{return (<></>)}
        });
    };

    return (<div className="ggPosts">{displayPosts()}</div>)
}

export default GGPosts;
