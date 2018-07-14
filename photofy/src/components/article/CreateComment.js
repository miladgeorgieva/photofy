import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, Input, Button } from 'reactstrap';
import requester from '../../infrastructure/requester';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';

class CreateComment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            articleId: this.props.articleId,
            comment: ''
        }
    }


    handleChange = ev => {
        let fieldName = ev.target.name;
        let fieldValue = ev.target.value;
        this.setState({
            [fieldName]: fieldValue
        });
    }

    handleSubmit = (ev) => {
        ev.preventDefault();

        requester.post('appdata', 'comments', 'kinvey', this.state)
            .then(res => {
                toast("Comment added.", {type: toast.TYPE.SUCCESS});
                window.location.reload();
            }).catch(err => toast("Whoops. An error occured.", {type: toast.TYPE.ERROR}));
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col md="8" xs="10" className="comment-col">
                        <div className="panel panel-white post panel-shadow">
                        <div className="pull-left meta">
                            <div className="title h5 your-comment">
                                Your comment:
                            </div>
                        </div>
                        <FormGroup>
                            <div className="post-description"> 
                                <Input type="textarea" name="comment" placeholder="say something about this..." onChange={this.handleChange} required="true"/>
                            </div>
                        </FormGroup>
                        <Input type="hidden" name="article-id" value={this.state.articleId}/>
                        <Button className="add-comment-btn">Add Comment</Button>
                        </div>
                    </Col>
                </Row>
            </Form>
            
        )
    }
}

export default withRouter(CreateComment);