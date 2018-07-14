import React, { Component } from 'react';
import CardPost from './CardPost';
import requester from '../../infrastructure/requester';
import { Row } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

class MyProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            articles: [],
            username: ''
        }
    }

    getAllArticlesById = () => {
        requester.get('appdata', 'photos/?query={"_acl.creator": "' + this.state.id + '"}&sort={"_kmd.ect": -1}', 'kinvey')
        .then(res => {
            this.setState({
                articles: res
            });
        })
        .catch(err => toast("Whoops. An error occured.", {type: toast.TYPE.ERROR}));
    }

    getUsername = () => {
        requester.get('user', this.state.id, 'kinvey')
            .then(res => {
                this.setState({
                    username: res.username
                });
            }).catch(err => toast("Whoops. An error occured.", {type: toast.TYPE.ERROR}));
    }

    componentDidMount = () => {
        this.getAllArticlesById();
        this.getUsername();
    }
    render() {
        let numberOfPosts = (this.state.articles.length);
        return (
            <div className="profile-container">
                <h1>{this.state.username}'s Profile</h1>
                <p>{numberOfPosts} posts</p>
                <hr/>
                <Row>
                    {this.state.articles.map(card => <CardPost key={card._id} {...card}/>)}
                </Row>
            </div>
        )
    }
}

export default withRouter(MyProfile);