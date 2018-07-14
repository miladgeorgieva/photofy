import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import requester from '../../infrastructure/requester';
import { toast } from 'react-toastify';

function pluralize(value) {
    if (value !== 1) return 's';
    else return '';
}

class Comment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: ''
        }
    }
    
    createdBeforeDays = () => {
        let dateIsoFormat = this.props._kmd.ect;
        let diff = new Date() - (new Date(dateIsoFormat));
        diff = Math.floor(diff / 60000);
        if (diff < 1) return 'less than a minute';
        if (diff < 60) return diff + ' minute' + pluralize(diff);
        diff = Math.floor(diff / 60);
        if (diff < 24) return diff + ' hour' + pluralize(diff);
        diff = Math.floor(diff / 24);
        if (diff < 30) return diff + ' day' + pluralize(diff);
        diff = Math.floor(diff / 30);
        if (diff < 12) return diff + ' month' + pluralize(diff);
        diff = Math.floor(diff / 12);
        return diff + ' year' + pluralize(diff);
    }

    getUsername = () => {
        requester.get('user', this.props._acl.creator, 'kinvey')
            .then(res => {
                this.setState({
                    username: res.username
                });
            }).catch(err => toast("Whoops. An error occured.", {type: toast.TYPE.ERROR}));
    }

    componentDidMount = () => this.getUsername();

    render() {
        return (
            <Row>
                <Col md="8" xs="10" className="comment-col">
                    <div className="panel panel-white post panel-shadow">
                        <div className="post-heading">
                            <div className="pull-left meta">
                                <div className="title h5">
                                    <Link to={"/user/" + this.props._acl.creator}><b>{this.state.username} </b></Link>
                                    made a comment.
                                </div>
                                <h6 className="text-muted time">{this.createdBeforeDays()} ago</h6>
                            </div>
                        </div> 
                        <div className="post-description"> 
                            <p>{this.props.comment}</p>
                        </div>
                    </div>
                </Col>
            </Row>
        )
    }
}

export default Comment;