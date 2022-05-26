const Delete = (props) => {

    // console.log(props.auth);
    // console.log(props.post.userid);

    async function onPress(){
        const post = {

            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify({ 
                id: props.post.id,
                userid: props.post.userid,
                contents: "[ Deleted ]",
                parent_post: props.post.parent_post
            })
        };

        await fetch("http://catstagram.lofty.codes/api/comments/?format=api", post);
        window.location.reload();
    }

    if (props.auth == props.post.userid) return (<button onClick={onPress}>Delete</button>);
    return (<></>);
}

export default Delete;