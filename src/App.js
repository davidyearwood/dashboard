import React from 'react';

import Tabs from './components/Tabs/Tabs';
import SearchBox from './components/SearchBox/SearchBox'; 
import Nav from './components/Nav/Nav'; 
import UserTable from './components/UserTable/UserTable';

import './main.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            users: [], 
            searchValue: '', 
            filterValue: 'all'
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleTabClick = this.handleTabClick.bind(this);
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
                    <div className="card">
                        <header className="card-header">
                            <Tabs tabItems={tabs} />
                        </header>
                        <div className="card-body">
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