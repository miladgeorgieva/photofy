import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import requester from '../../infrastructure/requester';
import { toast } from 'react-toastify';

class Logout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false
        }
    }
    logout = () => {
        requester.post('user', '_logout', 'kinvey')
            .then(res => { 
                sessionStorage.removeItem('authtoken');
                sessionStorage.removeItem('userId');
                sessionStorage.removeItem('isAdmin');
                this.setState({
                    redirect: true
                })
                toast("Logged out successfully", {type: toast.TYPE.SUCCESS});
            }).catch(err => toast("Whoops. An error occured.", {type: toast.TYPE.ERROR}));
    }

    componentDidMount = () => this.logout();

    render = () => {
        if(this.state.redirect) {
            return <Redirect to='/'/>;
        }
        return '';
    }
}

export default Logout;