import React from 'react';

import Tabs from './components/Tabs/Tabs';
import SearchBox from './components/SearchBox/SearchBox'; 
import Nav from './components/Nav/Nav'; 

import './main.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            users: []
        }
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
            }, (error) => {
                this.setState({
                    isLoaded: true,
                    error: error
                });
            })
    }

    render() {
        const tabs = [{text: "All"}, {text: "Active"}, {text: "Pending"}];
        const { users, isLoaded, error } = this.state; 

        // create table rows
        const userRows = users.map((user) => {
            return(
                <tr>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.state}</td>
                </tr>
            );
        });

        return(
                <div>
            <Nav />
    <div className="container">
    <div className="card">
        <header className="card-header">
            <Tabs tabItems={tabs} />
        </header>
        <div className="card-body">
            <SearchBox value="" />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Email</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Active</th>
                    </tr>
                </thead>
                <tbody>
                    {userRows}
                </tbody>
            </table>
        </div>
    </div>
    </div>
    </div>
        );
    }
}

export default App;