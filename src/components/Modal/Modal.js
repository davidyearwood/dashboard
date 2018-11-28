import React from 'react'; 

function Modal(props) {
    
    return (
        <React.Fragment>
            <div className={"backdrop " + props.modalStyles } onClick={props.onBackdropClick}>
            </div>
            <div className={"modal " + props.modalStyles } tabindex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title h5">{props.title}</h5>
                            <button type="button" className="close"  aria-label="Close" onClick={props.onDismissBtnClick} >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Modal; 