import React from 'react';

import Tabs from './components/Tabs/Tabs';
import SearchBox from './components/SearchBox/SearchBox'; 
import Nav from './components/Nav/Nav'; 
import UserTable from './components/UserTable/UserTable';
import Modal from './components/Modal/Modal'; 
import UserForm from './components/UserForm/UserForm';
import './main.css';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import isAlpha from 'validator/lib/isAlpha';
import fetchUsers from './utils/fetchUsers';
import handleFailedHttpResponse from './utils/handleFailedHttpResponse'; 


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            users: [], 
            searchValue: '', 
            filterValue: 'all', 
            displayModal: false,
            isDataSubmitValid: null,
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
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleTabClick = this.handleTabClick.bind(this);
        this.handleDismissBtnClick = this.handleDismissBtnClick.bind(this);
        this.handleCreateUserBtn = this.handleCreateUserBtn.bind(this);
        this.handleBackdropClick = this.handleBackdropClick.bind(this);
        this.handleUserFormSubmit = this.handleUserFormSubmit.bind(this);
        this.handleEmailBlur = this.handleEmailBlur.bind(this);
        this.handleFirstNameBlur = this.handleFirstNameBlur.bind(this);
        this.handleLastNameBlur = this.handleLastNameBlur.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this); 
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
    }

    // Load users
    componentDidMount() {
        fetchUsers()
            .then((result) => {
                this.setState({
                    users: result,
                    isLoaded: true
                });
                this.filterUsers = this.state.users; 
            }, (error) => {
                this.setState({
                    isLoaded: true,
                    error: error
                });
            })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.isDataSubmitValid === true) {
            fetchUsers()
            .then((result) => {
                this.setState({
                    users: result,
                    isLoaded: true,
                    isDataSubmitValid: false
                });
                this.filterUsers = this.state.users; 
            }, (error) => {
                this.setState({
                    isLoaded: true,
                    error: error, 
                    isDataSubmitValid: false
                });
            });
        }

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

    handleUserFormSubmit(e) {
        let data = { 
            email: this.state.email.value, 
            firstName: this.state.firstName.value, 
            lastName: this.state.lastName.value
        }; 

        e.preventDefault(); 

        if(this.state.email.hasError === false && 
            this.state.firstName.hasError === false && this.state.lastName.hasError === false) {
            fetch("/users", {
                method: "POST",
                mode: "cors",
                cahce: "no-cache", 
                credentials: "same-origin", 
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }, 
                referrer: "no-referrer",
                redirect: "manual", 
                body: JSON.stringify(data)
            })
            .then(handleFailedHttpResponse)
            .then(response => { 
                if (response.ok) {
                    this.setState({
                        form: {
                            isSubmitted: true, 
                            statusCode: response.statusText, 
                            hasError: !response.ok
                        }, 
                        displayModal: false,
                        isDataSubmitValid: true
                    });
                    console.log("data submitted");
                } 
            }).catch(error => {
                this.setState({
                    form: {
                        isSubmitted: true, 
                        statusCode: response.statusText, 
                        hasError: !response.ok
                    }, 
                    displayModal: false,
                    isDataSubmitValid: false
                });

                console.log(error);
            }); 
        }

        this.setState({
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
        })
    }

    handleChange(event) {
        this.setState({
            searchValue: event.target.value
        });
    }

    handleTabClick(event) {
        event.preventDefault(); 
        this.setState({
            filterValue: event.target.value
        });
    }

    handleDismissBtnClick(e) {
        // display block
        this.setState({
            displayModal: false
        });
    }

    handleBackdropClick(e) {
        this.setState({
            displayModal: false
        })
    }
    
    handleCreateUserBtn(e) {
        this.setState({
            displayModal: true
        });
    }

    searchUser(users, value) {
        if (!value) {
            return users; 
        }

        return users.filter((user) => {
            return user.firstName.includes(value) || 
                   user.lastName.includes(value) || 
                   user.email.includes(value);
        });
    }

    filterByStatus(users, status) {
        if (status === "all") {
            return users; 
        }

        return users.filter((user) => user.state === status); 
    }

    renderUserForm() {
        let userForm = (
            <Modal 
                title="Add a new User" 
                onDismissBtnClick={this.handleDismissBtnClick} 
                onBackdropClick={this.handleBackdropClick}
            >
            <UserForm 
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

                buttonText={"Register user"}
                onUserFormSubmit={this.handleUserFormSubmit}
            />
            </Modal>
        );

        if (this.state.displayModal) {
            return (userForm);
        }

        return null; 
    }

    render() {
        const tabs = [
            { 
                text: "All", 
                onClick: this.handleTabClick, 
                filterType: "all"
            }, 
            {
                text: "Active", 
                onClick: this.handleTabClick,
                filterType: "active"
            }, 
            {
                text: "Pending",
                onClick: this.handleTabClick, 
                filterType: "pending"
            }
        ];
        
        let { users, isLoaded, error, filterValue, searchValue } = this.state; 

        if (filterValue === "all" || filterValue === "pending" || filterValue === "active") {
            users = this.filterByStatus(users, filterValue); 
        }

        if (searchValue) {
            users = this.searchUser(users, searchValue); 
        }

        return(
            <div>
                <Nav />
                <div className="container">
                    {this.renderUserForm()}
                    <div className="card">
                        <header className="card-header pb-3 pt-4">
                            <h1 className="h2 float-left">Users</h1>
                            <button className="btn btn-primary float-right" onClick={this.handleCreateUserBtn}><i class="fas fa-plus mr-1"></i> Add a new User</button>
                        </header>
                        <div className="card-body">
                            <Tabs tabItems={tabs} />
                            <SearchBox value={this.state.searchValue} onChange={this.handleChange} />
                            <UserTable users={users} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;