import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import requester from '../../infrastructure/requester';
import { toast } from 'react-toastify';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            isAdmin: "false",
            active: "true"
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

        let errors = []

        if(this.state.username.length < 4) {
            errors.push('● Username length must be longer than 3 characters.');
        } 

        if(this.state.password.length < 4) {
            errors.push('● Password length must be longer than 3 characters.');
        } 

        if(ev.target[1].value !== ev.target[2].value) {
            errors.push('● Passwords do not match.');
        }

        requester.post('rpc', 'check-username-exists', 'basic', {username: this.state.username})
            .then(res => {
                if(res.usernameExists) {
                    errors.push('● This username already exists.');
                }

                if(errors.length > 0) {
                    toast(errors.join('\n'), {type: toast.TYPE.ERROR});
                    return;
                }
        
                requester.post('user', '', 'basic', this.state)
                    .then(res => {
                        sessionStorage.setItem('userId', res._id);
                        sessionStorage.setItem('authtoken', res._kmd.authtoken);
                        toast("Successfully registered.", {type: toast.TYPE.SUCCESS});
                        this.props.history.push('/home');
                    }).catch(err => toast("Whoops. An error occured.", {type: toast.TYPE.ERROR}));
            })
    }

    render() {
        return (
            <div id="overlay">
                <div className="logo">
                    <img src="/logo.png" alt="Photofy"/>
                </div>
                <div id="register-box" className="home-box">
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="username" className="mr-sm-2">Username</Label>
                            <Input type="username" onChange={this.handleChange} name="username" id="username" placeholder="username" required="true" />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="password" className="mr-sm-2">Password</Label>
                            <Input type="password" onChange={this.handleChange} name="password" id="password" placeholder="password" required="true"/>
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="repeat-password" className="mr-sm-2"> Repeat Password</Label>
                            <Input type="password" onChange={this.handleChange} name="password" id="repeat-password" placeholder="repeat password" required="true" />
                        </FormGroup>
                        <Button>Register</Button>
                        <p className="homebox-footer"><Link to="/">Already have an account? Click here to log in.</Link></p>
                    </Form>
                </div>
            </div> 
        )
    }
    
}

export default Register;