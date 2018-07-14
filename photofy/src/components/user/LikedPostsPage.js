import React, { Component } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import LikedPosts from './LikedPosts';

class LikedPostsPage extends Component {
    render() {
        return (
            <div>
                <Header/>
                <LikedPosts/>
                <Footer/>
            </div>
        )
    }
}

export default LikedPostsPage;