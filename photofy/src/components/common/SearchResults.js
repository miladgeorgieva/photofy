import React, { Component } from 'react';
import CardPost from '../user/CardPost';
import { Row } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class SearchResults extends Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: this.props.location.state.articles,
        }
    }

    render() {
        let numberOfPosts = (this.state.articles.length);
        return (
            <div className="profile-container">
                <h1>Results:</h1>
                <p>{numberOfPosts} posts</p>
                <hr/>
                <Row>
                    {this.state.articles.map(card => <CardPost key={card._id} {...card}/>)}
                </Row>
            </div>
        )
    }
}

export default withRouter(SearchResults);