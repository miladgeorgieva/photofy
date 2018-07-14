import React, { Component } from 'react';
import { Button } from 'reactstrap';
import requester from '../../infrastructure/requester';
import { toast } from 'react-toastify';

class TableRow extends Component {
    handleBlock = () => {
        let data = {
            username: this.props.username,
            isAdmin: this.props.isAdmin,
            active: false
        }
        requester.update('user', this.props._id, 'kinvey', data)
            .then(res => {
                toast("User blocked successfully.", {type: toast.TYPE.SUCCESS});
                window.location.reload();
            }).catch(err => toast("Whoops. An error occured.", {type: toast.TYPE.ERROR}));
    }

    handleUnblock = () => {
        let data = {
            username: this.props.username,
            isAdmin: this.props.isAdmin,
            active: true
        }
        requester.update('user', this.props._id, 'kinvey', data)
            .then(res => {
                toast("User unblocked successfully.", {type: toast.TYPE.SUCCESS});
                window.location.reload();
            }).catch(err => toast("Whoops. An error occured.", {type: toast.TYPE.ERROR}));
    }

    render() {
        let isActive = this.props.active;

        let button = (<Button onClick={this.handleBlock} className="block-button">Block</Button>);
        if(isActive === "false") {
            button = (<Button onClick={this.handleUnblock} className="block-button">Unblock</Button>)
        }
        return (
            <tr>
                <td>{this.props.username}</td>
                <td>{this.props._kmd.ect}}</td>
                <td>{button}</td>
            </tr>
        )
    }
}

export default TableRow;