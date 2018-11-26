import React from 'react'; 

function Feedback(props) {
    return (
        <div className={props.isInvalid ? "invalid-feedback" : "valid-feedback"}>{props.msg}</div>
    );
}

export default Feedback; 