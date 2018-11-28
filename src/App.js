import React from 'react';

import Tabs from './components/Tabs/Tabs';
import SearchBox from './components/SearchBox/SearchBox'; 
import Nav from './components/Nav/Nav'; 
import UserTable from './components/UserTable/UserTable';
import Modal from './components/Modal/Modal'; 
import CreateUserForm from './components/UserForm/CreateUser';
import './main.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            users: [], 
            searchValue: '', 
            filterValue: 'all', 
            displayModal: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleTabClick = this.handleTabClick.bind(this);
        this.handleDismissBtnClick = this.handleDismissBtnClick.bind(this);
        this.handleCreateUserBtn = this.handleCreateUserBtn.bind(this);
        this.handleBackdropClick = this.handleBackdropClick.bind(this);
    }

    // Load users
    componentDidMount() {
        fetch("/users")
            .then((res) => res.json())
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
                    <Modal 
                        title="Add a new User" 
                        onDismissBtnClick={this.handleDismissBtnClick} 
                        onBackdropClick={this.handleBackdropClick}
                        modalStyles={ this.state.displayModal ? "show" : ""}

                    > 
                        <CreateUserForm />
                    </Modal>
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