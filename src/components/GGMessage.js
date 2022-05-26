import React from 'react';


const GGMessage = (props) => {

    return( 
        <div className='post'>
            <h4>{props.usr}</h4>

            <p>Post:{props.contents}
                <br></br><br></br>
               Time: {props.time}</p>
        </div>     
    )
}

export default GGMessage;