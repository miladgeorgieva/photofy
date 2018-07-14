import React, { Component } from 'react';
import CardPost from './CardPost';
import requester from '../../infrastructure/requester';
import { Row } from 'reactstrap';
import { toast } from 'react-toastify';

class LikedPosts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: []
        }
    }

    getAllLikedArticles = () => {
        requester.get('appdata', 'likes/?query={"_acl.creator": "' + sessionStorage.getItem('userId') + '"}&sort={"_kmd.ect": -1}', 'kinvey')
            .then(res => {
                let articlesIds = [];
                res.forEach(element => {
                    articlesIds.push('"' + element.articleId + '"');
                });
                requester.get('appdata', 'photos/?query={"_id":{"$in":[' + articlesIds.join(",") + ']}}&sort={"_kmd.ect": -1}', 'kinvey')
                    .then(res => {
                        this.setState({
                            articles: res
                        });
                    })
                    .catch(err => toast("Whoops. An error occured.", {type: toast.TYPE.ERROR}));
            }).catch(err => toast("Whoops. An error occured.", {type: toast.TYPE.ERROR}));
        
        
    }

    componentDidMount = () => this.getAllLikedArticles();

    render() {
        let numberOfPosts = (this.state.articles.length);
        return (
            <div className="profile-container">
                <h1>Posts I've liked</h1>
                <p>{numberOfPosts} posts</p>
                <hr/>
                <Row>
                    {this.state.articles.map(card => <CardPost key={card._id} {...card}/>)}
                </Row>
            </div>
        )
    }
}

export default LikedPosts;