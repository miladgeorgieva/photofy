import React, { Component } from 'react';
import Header from '../common/Header';
import EditArticle from './EditArticle';
import Footer from '../common/Footer';
import requester from '../../infrastructure/requester';
import { toast } from 'react-toastify';

class ArticlePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            article: ''
        }
    }

    getArticleData = () => {
        requester.get('appdata', 'photos/?query={"_id": "'+ this.props.match.params.id +'"}', 'kinvey')
            .then(res => {
                this.setState({
                    article: res[0]
                });
            })
            .catch(err => toast("Whoops. An error occured.", {type: toast.TYPE.ERROR}));
    }

    componentWillMount = () => this.getArticleData();

    render() {
        return (
            <div>
                <Header/>
                <EditArticle article={this.state.article}/>
                <Footer/>
            </div>
        )
    }
}

export default ArticlePage;