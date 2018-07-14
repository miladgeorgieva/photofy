import React, { Component } from 'react';
import {
    Form,
    Collapse,
    Navbar,
    NavbarToggler,
    FormGroup,
    Nav,
    NavItem,
    Input,
    UncontrolledDropdown,
    NavLink,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import requester from '../../infrastructure/requester';
import { Redirect } from 'react-router'

class Header extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            username: '',
            redirect: false,
            searchData: '',
            isAdmin: false
        }
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    getUsername = () => {
        requester.get('user', sessionStorage.getItem('userId'), 'kinvey')
            .then(res => {
                this.setState({
                    username: res.username,
                    isAdmin: res.isAdmin
                });
            });
    }

    componentDidMount = () => this.getUsername();

    handleSearch = (ev)  => {
        ev.preventDefault();

        let searchInput = ev.target.search.value;
        requester.get('appdata', 'photos?query={"title":{"$regex":"^.*' + searchInput + '.*$"}}', 'kinvey')
            .then(res => {
               this.setState({
                   redirect: true,
                   searchData: res,
               })
            });
    }

    render() {
        const { redirect, searchData, isAdmin } = this.state

        if (redirect) {
            return (<Redirect to={{
                pathname: '/search-results',
                state: { articles: searchData }
            }} />)
        }
        
        let adminMenu = '';
        if (isAdmin === "true") {
            adminMenu = (<DropdownItem>
                <Link to="/admin/users">All Users</Link>
                </DropdownItem>)
        }
        return (
            <div>
                <div>
                    <header>
                        <div>
                            <Navbar color="white" light expand="md" id="main-content">
                                <div className="left-content">
                                    <Link to="/home"><img id="navbar-logo" src="./../logo.png" alt="photofy"/></Link>
                                </div>
                                <div className="center-content">
                                    <Form inline onSubmit={this.handleSearch}>
                                        <FormGroup className="search-box">
                                            <FontAwesome className="search-icon" name='search'/>
                                            <Input type="search" name="search" id="search" placeholder="Search by title..." />
                                        </FormGroup>
                                        <Button className="btn search-btn">Go</Button>
                                    </Form>
                                </div>
                                <div className="right-content">
                                <NavbarToggler onClick={this.toggle} />
                                <Collapse isOpen={this.state.isOpen} navbar>
                                    <Nav className="ml-auto navbar-content" navbar>
                                        <NavItem className="hello-user">Hello, {this.state.username}!</NavItem>
                                        <NavItem>
                                        <NavLink href="/create-post">Create <FontAwesome className="create-post" name='plus-square'/></NavLink>
                                        </NavItem>
                                        <UncontrolledDropdown nav inNavbar>
                                            <DropdownToggle nav caret>
                                            Account
                                            </DropdownToggle>
                                            <DropdownMenu right>
                                            <DropdownItem>
                                            <Link to={"/user/" + sessionStorage.getItem('userId')}>My Profile</Link>
                                            </DropdownItem>
                                            <DropdownItem>
                                            <Link to="/liked-posts">Posts I've Liked</Link>
                                            </DropdownItem>
                                            {adminMenu}
                                            <DropdownItem divider />
                                            <DropdownItem>
                                                <Link to="/logout">Logout</Link>
                                            </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </Nav>
                                </Collapse>
                                </div>
                            </Navbar>
                        </div>
                    </header>
                </div>
            </div>
        )
    }
}

export default Header;