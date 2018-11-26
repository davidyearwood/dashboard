import React from 'react';
import Feedback from './components/Feedback/Feedback';
import isEmail from 'validator/lib/isEmail';
import UserForm from './components/UserForm/UserForm'; 
import './stylesheet/card.css'; 

// Form fields: 
// Email 
// First 
// Last
export default class Signup extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            firstName: {
                value: '', 
                hasError: false, 
                msg: null,
                classNames: 'form-control'
            }, 
            lastName: {
                value: '', 
                hasError: false, 
                msg: null,
                classNames: 'form-control'
            }, 
            email: {
                value: '', 
                hasError: false, 
                msg: null,
                classNames: 'form-control'
            }
        } 
        this.handleEmailChange = this.handleEmailChange.bind(this); 
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailBlur = this.handleEmailBlur.bind(this);
    }

    handleFirstNameChange(e) {
        this.setState({
            firstName: {
                value: e.target.value, 
                hasError: false, 
                msg: null
            }
        });
    }

    handleLastNameChange(e) {
        this.setState({
            lastName: {
                value: e.target.value, 
                hasError: false, 
                msg: null
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

    // validating email: 
    // 1. When a user types in an invalid email:
    // 1a. Create an invalid feedback msg
    // 1b. Update the email input field's className to include is-invalid
    // Conversly: 
    // Create a valid feedback msg 
    // Update the email input field's className to include is-valid 
    // The className is-invalid and is-valid are only displayed when the user has commited a blur action
    handleEmailBlur(e) {
        if (isEmail(e.target.value)) {
            this.setState({
                email: {
                    value: e.target.value, 
                    hasError: false, 
                    msg: 'Looks good!', 
                    classNames: 'form-control is-valid'
                }
            });
        } else {
            this.setState({
                email: {
                    value: e.target.value, 
                    hasError: true, 
                    msg: 'Please enter a valid email',
                    classNames: 'form-control is-invalid'
                }
            });
        }
    }

    render() {
        return (
            <div className="container">
                <header className="header-signup text-center">
                    <img src="./img/yodlr.svg" class="mb-3 logo-bg" alt="" />
                </header>
                <div class="card mx-auto card-yodlr col-md-5">
                    <div className="card-body">
                        <h1 className="card-title h4 mt-3 mb-4 font-weight-normal">User Registration</h1>
                        <UserForm 
                            hasEmailFeedback={true}
                            emailClassName={this.state.email.classNames}
                            emailValue={this.state.email.value}
                            onEmailChange={this.handleEmailChange}
                            onEmailBlur={this.handleEmailBlur}
                            isEmailInvalid={this.state.email.hasError}
                            emailMsg={this.state.email.msg}

                            hasFirstNameFeedback={false}
                            firstNameClassName={this.state.firstName.classNames}
                            firstNameValue={this.state.firstName.value}
                            onFirstNameChange={this.handleFirstNameChange}

                            hasLastNameFeedback={false}
                            lastNameClassName={this.state.lastName.classNames}
                            lastNameValue={this.state.lastName.value}
                            onLastNameChange={this.handleLastNameChange}

                            buttonText={"Register user"}
                        />
                    </div>
                </div>
                <p className="text-center mt-3"><a href="/admin.html">Admin Page</a></p>
            </div>
        ); 
    }
}