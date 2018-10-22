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
        }
        this.handleChange = this.handleChange.bind(this);
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

    searchUser() {
        const { users, searchValue } = this.state; 

        if (!searchValue) {
            return users; 
        }

        return users.filter((user) => {
            return user.firstName.includes(searchValue) || 
                   user.lastName.includes(searchValue) || 
                   user.email.includes(searchValue);
        });

        return users; 
    }

    render() {
        const tabs = [{text: "All"}, {text: "Active"}, {text: "Pending"}];
        const { users, isLoaded, error } = this.state; 

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
                            <UserTable users={this.searchUser()} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;