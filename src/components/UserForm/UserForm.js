import React from 'react';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import isAlpha from 'validator/lib/isAlpha';
import UserFormView from './UserFormView'; 
import handleFailedHttpResponse from '../../utils/handleFailedHttpResponse'; 

import '../../stylesheet/card.css'; 

export default class UserForm extends React.Component {
    constructor(props) {
        super(props); 

        this.state = {
            firstName: {
                value: '', 
                hasError: true, 
                msg: null,
                classNames: 'form-control'
            }, 
            lastName: {
                value: '', 
                hasError: true, 
                msg: null,
                classNames: 'form-control'
            }, 
            email: {
                value: '', 
                hasError: true, 
                msg: null,
                classNames: 'form-control'
            },
            form: {
                isSubmitted: false,
                hasError: false,
                statusCode: '',
            },
        }; 

        // Email Field 
        this.handleEmailChange = this.handleEmailChange.bind(this); 
        this.handleEmailBlur = this.handleEmailBlur.bind(this);
        
        // First Name Field
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleFirstNameBlur = this.handleFirstNameBlur.bind(this);

        // last name field 
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleLastNameBlur = this.handleLastNameBlur.bind(this);

    }

    handleFirstNameChange(e) {
        this.setState({
            firstName: {
                value: e.target.value, 
                hasError: false, 
                msg: null,
                classNames: 'form-control'
            }
        });
    }

    handleLastNameChange(e) {
        this.setState({
            lastName: {
                value: e.target.value, 
                hasError: false, 
                msg: null,
                classNames: 'form-control'
            }
        });
    }

    handleEmailChange(e) {
        this.setState({
            email: {
                value: e.target.value, 
                hasError: false, 
                msg: null,
                classNames: 'form-control'
            }
        });
    }

    handleEmailBlur(e) {
        let emailField = {
            hasError: false, 
            msg: '', 
            classNames: 'form-control'
        };

        if (isEmpty(e.target.value)) {
            emailField.hasError = true; 
            emailField.msg = 'Your email is required.';
            emailField.classNames += ' is-invalid';  
        } else if (isEmail(e.target.value)) {
            emailField.hasError = false; 
            emailField.msg = 'Looks good!'; 
            emailField.classNames += ' is-valid'; 
        } else {
            emailField.hasError = true; 
            emailField.msg = 'Please enter a valid email.'; 
            emailField.classNames += ' is-invalid'
        }

        this.setState({
            email: Object.assign({}, this.state.email, emailField)
        });
    }

    handleFirstNameBlur(e) {
        let firstNameField = {
            hasError: false, 
            msg: '',
            classNames: 'form-control'
        };

        if (isEmpty(e.target.value)) {
            firstNameField.hasError = true; 
            firstNameField.msg = 'First name is required.';
            firstNameField.classNames += ' is-invalid';
        } else if(isAlpha(e.target.value)) {
            firstNameField.hasError = false; 
            firstNameField.msg = 'Looks good!'; 
            firstNameField.classNames += ' is-valid';
        } else {
            firstNameField.hasError = true;
            firstNameField.msg = 'Only characters in the alphabet are allowed.';
            firstNameField.classNames += ' is-invalid';
        }  

        this.setState({
            firstName: Object.assign({}, this.state.firstName, firstNameField)
        });
    }

    handleLastNameBlur(e) {
        let lastNameField = {
            hasError: false, 
            msg: '',
            classNames: 'form-control'
        };

        if (isEmpty(e.target.value)) {
            lastNameField.hasError = true; 
            lastNameField.msg = 'Last name is required.';
            lastNameField.classNames += ' is-invalid';
        } else if(isAlpha(e.target.value)) {
            lastNameField.hasError = false; 
            lastNameField.msg = 'Looks good!'; 
            lastNameField.classNames += ' is-valid';
        } else {
            lastNameField.hasError = true;
            lastNameField.msg = 'Only characters in the alphabet are allowed.';
            lastNameField.classNames += ' is-invalid';
        }  

        this.setState({
            lastName: Object.assign({}, this.state.lastName, lastNameField)
        });
    }
    
    render() {
        let formData = this.state; 
        return (
            <UserFormView
                hasEmailFeedback={true}
                emailClassName={this.state.email.classNames}
                emailValue={this.state.email.value}
                onEmailChange={this.handleEmailChange}
                onEmailBlur={this.handleEmailBlur}
                isEmailInvalid={this.state.email.hasError}
                emailMsg={this.state.email.msg}

                hasFirstNameFeedback={true}
                firstNameClassName={this.state.firstName.classNames}
                firstNameValue={this.state.firstName.value}
                onFirstNameChange={this.handleFirstNameChange}
                onFirstNameBlur={this.handleFirstNameBlur}
                firstNameMsg={this.state.firstName.msg}
                isFirstNameInvalid={this.state.firstName.hasError}

                hasLastNameFeedback={true}
                lastNameClassName={this.state.lastName.classNames}
                lastNameValue={this.state.lastName.value}
                onLastNameChange={this.handleLastNameChange}
                onLastNameBlur={this.handleLastNameBlur}
                isLastNameInvalid={this.state.lastName.hasError}
                lastNameMsg={this.state.lastName.msg}

                buttonText={this.props.buttonText}
                onUserFormSubmit={(e) => { this.props.onUserFormSubmit(e, formData) }}
            />
            );
    }
}