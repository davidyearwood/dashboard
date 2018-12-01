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
import postUsers from './utils/postUsers';
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
            notification: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleTabClick = this.handleTabClick.bind(this);
        this.handleDismissBtnClick = this.handleDismissBtnClick.bind(this);
        this.handleCreateUserBtn = this.handleCreateUserBtn.bind(this);
        this.handleBackdropClick = this.handleBackdropClick.bind(this);
        this.handleUserFormSubmit = this.handleUserFormSubmit.bind(this);
        this.handleUserAccountClick = this.handleUserAccountClick.bind(this);
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

    handleUserFormSubmit(e, formData) {
        let data = { 
            email: formData.email.value, 
            firstName: formData.firstName.value, 
            lastName: formData.lastName.value
        }; 

        e.preventDefault(); 

        if(formData.email.hasError === false && 
            formData.firstName.hasError === false && formData.lastName.hasError === false) {
            postUsers(data)
            .then(handleFailedHttpResponse)
            .then(response => { 
                if (response.ok) {
                    this.setState({
                        notification: `Created an account for ${data.firstName} ${data.lastName}`,
                        displayModal: false
                    })
                    // let the user know that it was a success
                    // close window
                    console.log(`${response}`);
                } 
            }).catch(error => {
                // notify your state
                console.log(error);
            }); 
        }
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
            <Modal title="Add a new User" onDismissBtnClick={this.handleDismissBtnClick} onBackdropClick={this.handleBackdropClick}>
                <UserForm buttonText={"Register user"}onUserFormSubmit={this.handleUserFormSubmit} />
            </Modal>
        );

        if (this.state.displayModal) {
            return (userForm);
        }

        return null; 
    }

    handleUserAccountClick(e, id) {
        let users = this.state.users; 
        
        let user = users.filter((user) => id === user.id)[0]; 

        if (user.state === "pending") {
            user.state = "active";
            // send post request
            fetch(`/users/${user.id}`, {
                method: "PUT",
                mode: "cors",
                cahce: "no-cache", 
                credentials: "same-origin", 
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }, 
                referrer: "no-referrer",
                redirect: "manual", 
                body: JSON.stringify(user)
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
                    isDataSubmitValid: false
                });
            });     
        } 
    }

    renderSuccessNotification() {
        if (this.state.notification !== null) {
            return (
                <div class="alert alert-success" role="alert">
                    {this.state.notification}
                </div>
            );
        } else {
            return null; 
        }
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
                    {this.renderSuccessNotification()}
                    {this.renderUserForm()}
                    <div className="card">
                        <header className="card-header pb-3 pt-4">
                            <h1 className="h2 float-left">Users</h1>
                            <button className="btn btn-primary float-right" onClick={this.handleCreateUserBtn}><i class="fas fa-plus mr-1"></i> Add a new User</button>
                        </header>
                        <div className="card-body">
                            <Tabs tabItems={tabs} />
                            <SearchBox value={this.state.searchValue} onChange={this.handleChange} />
                            <UserTable users={users} buttonText={"Activate Account"} onClick={this.handleUserAccountClick} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;