import React, { Component } from 'react';
import Header from '../common/Header';
import CreateArticle from './CreateArticle';
import Footer from '../common/Footer';

class ArticlePage extends Component {
    render() {
        return (
            <div>
                <Header/>
                <CreateArticle/>
                <Footer/>
            </div>
        )
    }
}

export default ArticlePage;