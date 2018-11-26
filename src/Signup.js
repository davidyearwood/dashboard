import React from 'react';
import isEmail from 'validator/lib/isEmail';
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
                <img src="./img/yodlr.svg" class="mb-3 logo-bg" alt="" />
            </header>
            <div class="card mx-auto card-yodlr col-md-5">
                <div className="card-body">
                    <h1 className="card-title h4 mt-3 mb-4 font-weight-normal">User Registration</h1>
                    <form method="POST" action="/users"> 
                        <div className="form-group mb-3">
                            <label for="email" className="form-field__label">Email</label>
                            <input type="email" name="email" className="form-control" id="email" placeholder="e.g., bob@gmail.com"value={ this.state.email.value} onChange={this.handleEmailChange}/> 
                        </div>

                        <div className="form-group mb-3">
                            <label for="first-name" className="form-field__label">First Name</label>
                            <input type="text" name="firstName" className="form-control" id="first-name" placeholder="e.g., Bob" value={ this.state.firstName.value} onChange={this.handleFirstNameChange}/> 
                        </div>

                        <div className="form-group mb-3"> 
                            <label for="last-name" className="form-field__label">Last Name</label>
                            <input type="text" name="lastName" className="form-control" id="last-name" placeholder="e.g., Smith"value={ this.state.lastName.value} onChange={this.handleLastNameChange}/>
                        </div>

                        <button type="submit" class="btn btn-primary btn-block mt-5 mb-3 btn-lg">Register user</button>
                    </form> 
                </div>
            </div>
            <p className="text-center mt-3"><a href="/admin.html">Admin Page</a></p>
        </div>
        ); 
    }
}