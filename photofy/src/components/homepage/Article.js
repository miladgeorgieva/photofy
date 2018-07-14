import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import requester from '../../infrastructure/requester';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            countComments: 0,
            countLikes: 0,
            isLiked: false
        }
    }

    getUsername = () => {
        requester.get('user', this.props._acl.creator, 'kinvey')
            .then(res => {
                this.setState({
                    username: res.username
                });
            }).catch(err => toast("Whoops. An error occured.", {type: toast.TYPE.ERROR}));
    }

    getComments = () => {
        requester.get('appdata', 'comments/_count?query={"articleId": "' + this.props._id + '"}', 'kinvey')
            .then(res => {
                this.setState({
                    countComments: res.count
                });
            })
            .catch(err => toast("Whoops. An error occured.", {type: toast.TYPE.ERROR}));
    }

    getLikes = () => {
        requester.get('appdata', 'likes/?query={"articleId": "' + this.props._id + '"}', 'kinvey')
            .then(res => {
                this.setState({
                    countLikes: res.length
                });
            })
            .catch(err => toast("Whoops. An error occured.", {type: toast.TYPE.ERROR}));
    }

    isLiked = () => {
        requester.get('appdata', 'likes/?query={"articleId": "' + this.props._id + '", "_acl.creator": "'+ sessionStorage.getItem('userId') +'"}', 'kinvey')
        .then(res => {
            if(res.length > 0) {
                this.setState({
                    isLiked: true
                });
            }
        })
        .catch(err => toast("Whoops. An error occured.", {type: toast.TYPE.ERROR}));
    }

    componentDidMount = () => {
        this.getUsername();
        this.getComments();
        this.getLikes();
        this.isLiked();
    }

    truncate = (s) => {
        if (s.length > 250) {
            return s.substring(0, 250) + "...";
        } else {
            return s;
        }
    }

    handleLike = (ev) => {
        ev.preventDefault();

        if(!this.state.isLiked) {
            requester.post('appdata', 'likes', 'kinvey', {articleId: this.props._id})
                .then(res => {
                    toast("Article liked.", {type: toast.TYPE.SUCCESS});
                    this.setState({
                        isLiked: true,
                        countLikes: this.state.countLikes + 1
                    })
                }).catch(err => toast("Whoops. An error occured.", {type: toast.TYPE.ERROR}));
        } else {
            requester.remove('appdata', 'likes/?query={"articleId": "' + this.props._id + '", "_acl.creator": "'+ sessionStorage.getItem('userId') + '"}', "kinvey")
                .then(res => {
                    toast("Article unliked.", {type: toast.TYPE.SUCCESS});
                    this.setState({
                        isLiked: false,
                        countLikes: this.state.countLikes - 1
                    })
                }).catch(err => toast("Whoops. An error occured.", {type: toast.TYPE.ERROR}));
        }
    }

    render() {
        let likeHeart = (<span className="like-post" onClick={this.handleLike}><i className="fa fa-heart-o"></i></span>);
        if(this.state.isLiked) {
            likeHeart =  (<span className="like-post" onClick={this.handleLike}><i className="fa fa-heart"></i></span>);
        }

        return (
            <Container>
                    <article className="home-article">
                        <Row className="article-row">
                            <Col md="4" sm="12" className="photo">
                                <img src={this.props.url} alt=""/>
                            </Col>
                            <Col md="8" sm="12">
                                <div className="article">
                                    <h1 className="article-title">{this.props.title}</h1>
                                    <p className="article-author">by: <Link to={"/user/" + this.props._acl.creator}><b>{this.state.username}</b></Link></p>
                                    <p className="article-story">
                                    {this.truncate(this.props.story)}
                                        <span className="read-more">
                                            <Link to={"/article/" + this.props._id}> read more</Link>
                                        </span>
                                    </p>
                                </div>
                                <hr/>
                                <div className="likes-comments">
                                    {likeHeart} |
                                    <span>{this.state.countLikes} likes</span>| 
                                    <Link to={"/article/" + this.props._id}>{this.state.countComments} comments</Link>
                                </div>
                            </Col>
                        </Row>
                    </article>
            </Container>            
        )
    }
}

export default Article;