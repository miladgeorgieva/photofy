import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Row, Col } from 'reactstrap';
import requester from '../../infrastructure/requester';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';

class EditArticle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.article.title,
            story: '',
            date: '',
            url: '',
            location: ''
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

        requester.update('appdata', 'photos/' + this.props.match.params.id, 'kinvey', this.state)
            .then(res => {
                toast("Article edited successfully.", {type: toast.TYPE.SUCCESS});
                this.props.history.push("/article/" + res._id);
            }).catch(err => toast("Whoops. An error occured.", {type: toast.TYPE.ERROR}));

    }
    
    render() {
        let {url} = this.state;
        let imagePreview = null;
        if (url) {
            imagePreview = (<img src={url} alt="preview"/>);
        } else {
            imagePreview = (<FormText color="muted"> Please, provide a photo.</FormText>);
        }

    return (
        <Row>
            <Col md="8" xs="10" className="article-container">
                <div>
                    <h1 className="title-create-article">Edit article</h1>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="title">Title:</Label>
                            <Input type="text" name="title" id="title" placeholder="title" value={this.state.title} onChange={this.handleChange} required="true"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="story">Story behind photo:</Label>
                            <Input type="textarea" name="story" id="story" value={this.state.story} onChange={this.handleChange} required="true"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="date-taken">Date taken:</Label>
                            <Input type="date" name="date" id="date-taken" placeholder="date taken" value={this.state.date} onChange={this.handleChange} required="true"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="location">Location:</Label>
                            <Input type="text" name="location" id="location" placeholder="where did this happen?" value={this.state.location} onChange={this.handleChange} required="true"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="url">Photo URL:</Label>
                            <Input type="url" name="url" id="url" placeholder="url to photo" value={this.state.url} onChange={this.handleChange} required="true"/>
                            <div id="image-preview">
                                {imagePreview}
                            </div>
                        </FormGroup>
                        <Button className="add-new-article">Edit Article</Button>
                    </Form>
                </div>
            </Col>
        </Row>
    );
  }
}

export default withRouter(EditArticle);