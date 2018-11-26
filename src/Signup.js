import React from 'react';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import isAlpha from 'validator/lib/isAlpha';
import CreateUser from './components/UserForm/CreateUser'; 
import './stylesheet/card.css'; 

export default class Signup extends React.Component {
    constructor(props) {
        super(props); 
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
                        <CreateUser />
                    </div>
                </div>
                <p className="text-center mt-3"><a href="/admin.html">Admin Page</a></p>
            </div>
        ); 
    }
}