import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import TableRow from './TableRow';

class Users extends Component {
    render() {
        let numberOfUsers = (this.props.users.length);

        return (
            <div className="admin-users-container">
                <p>{numberOfUsers} users</p>
                <Table hover>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Registered On</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.users.map(u => <TableRow key={u._id} {...u}/>)}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default withRouter(Users);