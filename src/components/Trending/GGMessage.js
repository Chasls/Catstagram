import React from 'react';
import Delete from "../Delete";

const GGMessage = (props) => {


    return (
      <div className="ggMessage">
        <div className="trendBox">
          <p>
            Post:{props.contents}
            <br></br>
            <br></br>
            Time: {props.time}
          </p>
        </div>
      </div>
    );
}

export default GGMessage;