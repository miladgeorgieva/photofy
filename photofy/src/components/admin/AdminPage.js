import React, { Component } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Users from './Users';
import requester from '../../infrastructure/requester';
import { toast } from 'react-toastify';

class AdminPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            username: ''
        }
    }

    getUsername = () => {
        requester.get('user', sessionStorage.getItem('userId'), 'kinvey')
            .then(res => {
                this.setState({
                    username: res.username
                });

                this.getAllUsers();
            });
    }

    getAllUsers = () => {
        console.log(this.state.username)
        requester.get('user', '?query={"username":{"$regex":"^^(?!' + this.state.username + ').*$$"}}', 'kinvey')
            .then(res => {
                this.setState({
                    users: res
                })
            }).catch(err => toast("Whoops. An error occured.", {type: toast.TYPE.ERROR}));
    }

    componentDidMount = () => this.getUsername();

    render() {
        return (
            <div>
                <Header/>
                <Users users={this.state.users}/>
                <Footer/>
            </div>
        )
    }
}

export default AdminPage;