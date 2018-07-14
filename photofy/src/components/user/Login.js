import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import requester from '../../infrastructure/requester';
import { toast } from 'react-toastify';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = ev => {
        let fieldName = ev.target.name;
        let fieldValue = ev.target.value;
        this.setState({
            [fieldName]: fieldValue
        });
    }

    handleSubmit = ev => {
        ev.preventDefault();

        requester.post('rpc', 'check-username-exists', 'basic', {username: this.state.username})
            .then(res => {
                if(res.usernameExists) {
                    requester.post('user', 'login', 'basic', this.state)
                        .then(res => {
                            if(res['active'] === "false") {
                                toast("Your account has been blocked.", {type: toast.TYPE.ERROR});
                                return;
                            }
                            if(res['isAdmin'] === "true") {
                                sessionStorage.setItem('isAdmin', true);
                            }
                            sessionStorage.setItem('userId', res._id);
                            sessionStorage.setItem('authtoken', res._kmd.authtoken);
                            toast("Logged in successfully.", {type: toast.TYPE.SUCCESS});
                            this.props.history.push('/home');
                        })
                        .catch(res => {
                            toast("Username or password is incorrect.", {type: toast.TYPE.ERROR});
                            return;
                    });
                } else {
                    toast("Username does not exist.", {type: toast.TYPE.ERROR});
                    return;
                }
            });
    }
    render() {
        return (
            <div id="overlay">
                <div className="logo">
                    <img src="/logo.png" alt="Photofy"/>
                </div>
                <div id="login-box" className="home-box">
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="username" className="mr-sm-2">Username</Label>
                            <Input type="username" onChange={this.handleChange} name="username" id="username" placeholder="username" required="true" />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="password" className="mr-sm-2">Password</Label>
                            <Input type="password" onChange={this.handleChange} name="password" id="password" placeholder="password" required="true" />
                        </FormGroup>
                        <Button>Log In</Button>
                        <p className="homebox-footer"><Link to="/register">Don't have an account yet? Register here.</Link></p>
                    </Form>
                </div>
            </div> 
        )
    }
    
}

export default Login;