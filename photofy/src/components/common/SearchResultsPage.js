import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import SearchResults from './SearchResults';

class SearchResultsPage extends Component {

    render() {
        return (
            <div>
                <Header/>
                <SearchResults/>
                <Footer/>
            </div>
        )
    }
}

export default SearchResultsPage;