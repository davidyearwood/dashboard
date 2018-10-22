import React from 'react';
import ReactDOM  from 'react-dom';

// import 'bootstrap/dist/css/bootstrap.min.css';
import Tabs from './components/Tabs/Tabs';
import SearchBox from './components/SearchBox/SearchBox'; 

import './main.css';

const tabs = [{text: "All"}, {text: "Active"}, {text: "Pending"}];
const users = [{"id":1,"email":"kyle@getyodlr.com","firstName":"Kyle","lastName":"White","state":"active"},{"id":2,"email":"jane@getyodlr.com","firstName":"Jane","lastName":"Stone","state":"active"},{"id":3,"email":"lilly@getyodlr.com","firstName":"Lilly","lastName":"Smith","state":"pending"},{"id":4,"email":"fred@getyodlr.com","firstName":"Fred","lastName":"Miles","state":"pending"},{"id":5,"email":"alex@getyodlr.com","firstName":"Alexandra","lastName":"Betts","state":"pending"}];

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
const comp = (
    <div>
    <nav class="navbar navbar-light custom-nav bg-deep-blue mb-4">
        <a class="navbar-brand white" href="#">
         <img src="./img/yodlr.svg" width="30" height="30" class="d-inline-block align-top" alt="" />
            Admin Panel
        </a>
    </nav>
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

ReactDOM.render(comp, document.getElementById('root'));