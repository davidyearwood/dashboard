import React from 'react';
import Feedback from '../Feedback/Feedback'; 

function UserForm(props) {
    return (
        <form method="POST" action="/users" noValidate> 
            <div className="form-group mb-3">
                <label for="email" className="form-field__label">Email</label>
                <input 
                    type="email" 
                    name="email" 
                    className={props.emailClassName} 
                    id="email" 
                    placeholder="e.g., bob@gmail.com" 
                    value={props.emailValue} 
                    onChange={props.onEmailChange} 
                    onBlur={props.onEmailBlur} 
                /> 
                { props.hasEmailFeedback ? <Feedback isInvalid={props.isEmailInvalid} msg={props.emailMsg} /> : null }
            </div>

            <div className="form-group mb-3">
                <label for="first-name" className="form-field__label">First Name</label>
                <input 
                    type="text" 
                    name="firstName" 
                    className={props.firstNameClassName} 
                    id="first-name" 
                    placeholder="e.g., Bob" 
                    value={ props.firstNameValue} 
                    onChange={props.onFirstNameChange}
                    onBlur={props.onFirstNameBlur}
                /> 
                {props.hasFirstNameFeedback ? <Feedback isInvalid={props.isFirstNameInvald} msg={props.firstNameMessage} /> : null}
            </div>

            <div className="form-group mb-3"> 
                <label for="last-name" className="form-field__label">Last Name</label>
                <input 
                    type="text" 
                    name="lastName" 
                    className={props.lastNameClassName} 
                    id="last-name" 
                    placeholder="e.g., Smith"
                    value={props.lastNameValue} 
                    onChange={props.onLastNameChange}
                    onBlur={props.onLastNameBlur}
                />
                { props.hasLastNameFeedback ? <Feedback isInvalid={props.isLastNameInvald} msg={props.LastNameMessage} /> : null }
            </div>

            <button 
                type="submit" 
                class="btn btn-primary btn-block mt-5 mb-3 btn-lg"
                onSubmit={props.onUserFormSubmit}
            >
                {props.buttonText}
            </button>
        </form>
    ); 
}

export default UserForm; 