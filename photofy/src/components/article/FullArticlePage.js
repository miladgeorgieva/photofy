import React, { Component } from 'react';
import Header from '../common/Header';
import ViewFullArticle from './ViewFullArticle';
import Footer from '../common/Footer';
import Comment from './Comment';
import CreateComment from './CreateComment';
import requester from '../../infrastructure/requester';
import { toast } from 'react-toastify';

class FullArticlePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            comments: []
        }
    }
    
    getComments = () => {
        requester.get('appdata', 'comments/?query={"articleId": "' + this.state.id + '"}&sort={"_kmd.ect": -1}', 'kinvey')
            .then(res => {
                this.setState({
                    comments: res
                });
            })
            .catch(err => toast("Whoops. An error occured.", {type: toast.TYPE.ERROR}));
    }

    componentDidMount = () => this.getComments();

    render() {
        return (
            <div>
                <Header/>
                <ViewFullArticle id={this.state.id}/>
                <h2 className="comments">Comments</h2>
                {this.state.comments.map(c => <Comment key={c._id} {...c}/>)}
                <CreateComment articleId={this.state.id}/>
                <Footer/>
            </div>
        )
    }
}

export default FullArticlePage;