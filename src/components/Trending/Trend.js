import { Navigate } from "react-router-dom";
import React, { Component } from "react";
import GGPosts from "./GGPosts";

class Trend extends Component{
    constructor(){
        super();
        this.state = {post: [], hashtag: ""};
    }

    handleChange = event => {this.setState({ hashtag: event.target.value});}

    componentDidMount(){

        var API_URL = "http://localhost:8081";
        API_URL = API_URL + "/post/";

        fetch(API_URL,{
        method: "get",
        })

        .then(response => {

            if(!response.ok){throw Error("Error fetching all user array");}
            return response.json()

            .then(json => {this.setState({ post: json});})
            .catch(err => {throw Error(err.message)});
        });

    }

    render() {
        return this.props.currentUserId>0 ? (
            <section>
                <div className="searchBox">
                    <label>Search for Trend: </label>
                    <input type="text" onChange = {this.handleChange} value={this.state.hashtag}/>
                </div>
                <GGPosts hashtag = {this.state.hashtag} post={this.state.post}/>
                <div className="genericFooter"></div>
            </section>
            
        ) :( <Navigate to ="/login" /> );
    }
}

export default Trend;