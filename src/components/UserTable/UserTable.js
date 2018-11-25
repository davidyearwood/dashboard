import React from 'react';

function UserTable(props) {
    const userRows = props.users.map((user) => {
        return(
            <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.state}</td>
            </tr>
        );
    }); 

    return (
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
    ); 
} 

export default UserTable; 