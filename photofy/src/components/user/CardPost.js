import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';

class CardPost extends Component {
    truncate = (s) => {
        if (s.length > 50) {
            return s.substring(0, 50) + "...";
        } else {
            return s;
        }
    }

    render() {
        return (
            <Col lg="3" md="6" sm="12" xs="12">
                <Card>
                    <CardImg top width="100%" src={this.props.url} alt="Card image cap" />
                    <CardBody>
                        <CardTitle>{this.props.title}</CardTitle>
                        <CardSubtitle>Date taken: {this.props.date}</CardSubtitle>
                        <CardText>{this.truncate(this.props.story)}</CardText>
                        <Link to={"/article/" + this.props._id} className="btn btn-primary">View Post</Link>
                    </CardBody>
                </Card>
            </Col>
        )
    }
}

export default CardPost;