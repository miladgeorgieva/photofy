import React, { Component } from 'react';
import Header from '../common/Header';
import Article from './Article';
import Footer from '../common/Footer';
import requester from '../../infrastructure/requester';
import { toast } from 'react-toastify';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: []
        }
    }

    getAllArticles = () => {
        return requester.get('appdata', 'photos/?query={}&sort={"_kmd.ect": -1}', 'kinvey')
            .then(res => {
                this.setState({
                    articles: res
                });
            }).catch(err => toast("Whoops. An error occured.", {type: toast.TYPE.ERROR}));
    }

    componentDidMount = () => this.getAllArticles();

    render() {
        return (
            <div id="home-page">
                <Header/>
                <h1 className="title-discover">Discover</h1>
                {this.state.articles.map(a => <Article key={a._id} {...a}/>)}
                <Footer/>
            </div>
        )
    }
}

export default HomePage;