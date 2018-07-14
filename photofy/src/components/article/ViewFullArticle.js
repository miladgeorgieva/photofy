import React, { Component } from 'react';
import ModalArticlePhoto from './ModalArticlePhoto';
import { Button, Row, Col } from 'reactstrap';
import requester from '../../infrastructure/requester';
import { toast } from 'react-toastify';
import { withRouter, Link } from 'react-router-dom';

class ViewFullArticle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            article: '',
            isAuthor: false,
            userId: ''
        }
    }

    getArticle = () => {
        requester.get('appdata', 'photos/' + this.props.id, 'kinvey')
            .then(res => {
                if (res._acl.creator === sessionStorage.getItem("userId")) {
                    this.setState({
                        isAuthor: true
                    })
                }
                this.setState({
                    article: res
                });
                
                requester.get('user', res._acl.creator, 'kinvey')
                    .then(res => {
                        this.setState({
                            username: res.username,
                            userId: res._acl.creator
                        });
                    }).catch(err => toast("Whoops. An error occured.", {type: toast.TYPE.ERROR}));
            }).catch(err => toast("Whoops. An error occured.", {type: toast.TYPE.ERROR}));
    }

    deleteArticle = () => {
        let deletePhotos = requester.remove('appdata', 'photos/?query={"_id": "' + this.props.id + '"}', 'kinvey'); 
        let deleteComments = requester.remove('appdata', 'comments/?query={"articleId": "' + this.props.id + '"}', 'kinvey');
        let deleteLikes = requester.remove('appdata', 'likes/?query={"articleId": "' + this.props.id + '"}', 'kinvey'); 

        Promise.all([deletePhotos, deleteComments, deleteLikes])
            .then(res => {
                toast("Deleted article successfully.", {type: toast.TYPE.SUCCESS});
                this.props.history.push('/home');
            })
            .catch(err => toast("Whoops. An error occured.", {type: toast.TYPE.ERROR}));
    }

    componentDidMount = () => this.getArticle();

    render() {
        let authorButtons = '';
        if (this.state.isAuthor) {
            authorButtons = (
                <div>
                    <Link to={'/edit/' + this.state.article._id} className="btn btn-warning">Edit</Link>
                    <Button color="danger" onClick={this.deleteArticle}>Delete</Button>
                </div>
            );
        }
        return (
            <Row>
                <Col md="8" xs="10" className="article-container">
                    <h1>{this.state.article.title}</h1>
                    <div className="article-header">
                        <hr/>
                        <p>by: <Link to={"/user/" + this.state.userId}><b>{this.state.username} </b></Link></p>
                        <p>date taken: {this.state.article.date}</p>
                        <p>location: {this.state.article.location}</p>
                        <hr/>
                    </div>
                    <p>
                        {this.state.article.story}
                    </p>
                    <ModalArticlePhoto title={this.state.article.title} photoUrl={this.state.article.url}/>
                    
                   {authorButtons}
                </Col>
            </Row>
        )
    }
}

export default withRouter(ViewFullArticle);