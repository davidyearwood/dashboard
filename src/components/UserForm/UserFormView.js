import React from 'react';

const UserFormInput = (props) => (
    <div className="form-group mb-3">
        <label for={props.id} className="form-field__label">{props.labelText}</label>
        <input 
            type={props.type} 
            name={props.name}
            className={props.className} 
            id={props.id} 
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
            required
        />
        { 
            props.hasFeedback ? 
            <div className={props.isInvalid ? "invalid-feedback" : "valid-feedback"}>{props.msg}</div> : 
            null 
        }
    </div>
); 

function UserFormView(props) {
    return (
        <form noValidate onSubmit={props.onUserFormSubmit}> 
            <UserFormInput 
                labelText="Email"
                type="email" 
                name="email" 
                className={props.emailClassName} 
                id="email" 
                placeholder="e.g., bob@gmail.com" 
                value={props.emailValue} 
                onChange={props.onEmailChange} 
                onBlur={props.onEmailBlur}
                hasFeedback={props.hasEmailFeedback}
                isInvalid={props.isEmailInvalid}
                msg={props.emailMsg}
                required 
            />

            <UserFormInput 
                labelText="First Name"
                type="text" 
                name="firstName" 
                className={props.firstNameClassName} 
                id="first-name" 
                placeholder="e.g., Bob" 
                value={ props.firstNameValue} 
                onChange={props.onFirstNameChange}
                onBlur={props.onFirstNameBlur}
                hasFeedback={props.hasFirstNameFeedback}
                isInvalid={props.isFirstNameInvalid}
                msg={props.FirstNameMsg}
                required 
            />

            <UserFormInput 
                labelText="Last Name"
                type="text" 
                name="lastName" 
                className={props.lastNameClassName} 
                id="last-name" 
                placeholder="e.g., Bob" 
                value={ props.lastNameValue} 
                onChange={props.onLastNameChange}
                onBlur={props.onLastNameBlur}
                hasFeedback={props.hasLastNameFeedback}
                isInvalid={props.isLastNameInvalid}
                msg={props.lastNameMsg}
                required 
            />

            <button type="submit" class="btn btn-primary btn-block mt-5 mb-3 btn-lg">
                {props.buttonText}
            </button>
        </form>
    ); 
}

export default UserFormView; 