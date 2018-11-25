import React from 'react';


// Form fields: 
// Email 
// First 
// Last
export default class Signup extends React.Component {
    constructor() {
        
    }
    render() {
        return (
            <form method="POST" action="/users"> 
                <p className="form-field">
                    <label for="email" className="form-field__label">Email</label>
                    <input type="email" className="form-field__input" id="email"/> 
                </p>

                <p className="form-field">
                    <label for="first-name" className="form-field__label">First Name</label>
                    <input type="text" className="form-field__input" id="first-name" /> 
                </p>

                <p className="form-field"> 
                    <label for="last-name" className="form-field__label">Last Name</label>
                    <input type="text" className="form-field__input" id="last-name" />
                </p>

                <button type="submit">Register user</button>
            </form> 
        ); 
    }
}