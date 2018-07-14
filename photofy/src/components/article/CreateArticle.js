import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Row, Col } from 'reactstrap';
import requester from '../../infrastructure/requester';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';

class CreateArticle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
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

        requester.post('appdata', 'photos', 'kinvey', this.state)
            .then(res => {
                toast("Article created successfully.", {type: toast.TYPE.SUCCESS});
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
                    <h1 className="title-create-article">Create new article</h1>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="title">Title:</Label>
                            <Input type="text" name="title" id="title" placeholder="title" onChange={this.handleChange} required="true"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="story">Story behind photo:</Label>
                            <Input type="textarea" name="story" id="story" onChange={this.handleChange} required="true"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="date-taken">Date taken:</Label>
                            <Input type="date" name="date" id="date-taken" placeholder="date taken" onChange={this.handleChange} required="true"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="location">Location:</Label>
                            <Input type="text" name="location" id="location" placeholder="where did this happen?" onChange={this.handleChange} required="true"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="url">Photo URL:</Label>
                            <Input type="url" name="url" id="url" placeholder="url to photo" onChange={this.handleChange} required="true"/>
                            <div id="image-preview">
                                {imagePreview}
                            </div>
                        </FormGroup>
                        <Button className="add-new-article">Add Article</Button>
                    </Form>
                </div>
            </Col>
        </Row>
    );
  }
}

export default withRouter(CreateArticle);