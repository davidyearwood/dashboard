import React from 'react'; 

function Flash(props) {
    return (
        <div className={"flash text-center mt-3"}>
            { props.hasError ? <i class="fas fa-sad-cry text-danger fa-7x mb-3"></i> : <i class="fas fa-check-circle text-success fa-7x mb-3"></i> }
            { props.children }
        </div> 
    );     
}

export default Flash; 