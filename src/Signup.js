import React from 'react';
import isEmail from 'validator/lib/isEmail';

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
                errorMessage: null
            }, 
            lastName: {
                value: '', 
                hasError: false, 
                errorMessage: null
            }, 
            email: {
                value: '', 
                hasError: false, 
                errorMessage: null
            }
        } 
        this.handleEmailChange = this.handleEmailChange.bind(this); 
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
    }

    handleFirstNameChange(e) {
        this.setState({
            firstName: {
                value: e.target.value, 
                hasError: false, 
                errorMessage: null
            }
        });
    }

    handleLastNameChange(e) {
        this.setState({
            lastName: {
                value: e.target.value, 
                hasError: false, 
                errorMessage: null
            }
        });
    }

    handleEmailChange(e) {
        this.setState({
            email: {
                value: e.target.value, 
                hasError: false, 
                errorMessage: null
            }
        });
    }

    render() {
        return (
        <div className="container">
            <header className="header-signup text-center">
                <img src="./img/yodlr.svg" class="" alt="" />
            </header>
            <div class="card mx-auto">
                <h1 className="card-header">User Registration</h1>
                <div className="card-body">
                    <form method="POST" action="/users"> 
                        <div className="form-group">
                            <label for="email" className="form-field__label">Email</label>
                            <input type="email" name="email" className="form-control" id="email" value={ this.state.email.value} onChange={this.handleEmailChange}/> 
                        </div>

                        <div className="form-group">
                            <label for="first-name" className="form-field__label">First Name</label>
                            <input type="text" name="firstName" className="form-control" id="first-name" value={ this.state.firstName.value} onChange={this.handleFirstNameChange}/> 
                        </div>

                        <div className="form-group"> 
                            <label for="last-name" className="form-field__label">Last Name</label>
                            <input type="text" name="lastName" className="form-control" id="last-name" value={ this.state.lastName.value} onChange={this.handleLastNameChange}/>
                        </div>

                        <button type="submit" class="btn btn-primary btn-block">Register user</button>
                    </form> 
                </div>
            </div>
        </div>
        ); 
    }
}