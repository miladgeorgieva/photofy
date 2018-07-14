import React, { Component } from 'react';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import Login from './components/user/Login';
import Register from './components/user/Register';
import HomePage from './components/homepage/HomePage';
import CreateArticlePage from './components/article/CreateArticlePage';
import EditArticlePage from './components/article/EditArticlePage';
import FullArticlePage from './components/article/FullArticlePage';
import ProfilePage from './components/user/ProfilePage';
import LikedPostsPage from './components/user/LikedPostsPage';
import SearchResultsPage from './components/common/SearchResultsPage';
import AdminPage from './components/admin/AdminPage';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Logout from './components/user/Logout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RedirectRoute from './components/common/RedirectRoute'
import GuestRoute from './components/common/GuestRoute'
import AdminRoute from './components/common/AdminRoute'

class App extends Component {
  render() {
    return (
      <div id="body-container">
        <Router>
          <Switch>
            <GuestRoute path="/" exact component={Login}/>
            <GuestRoute path="/register" component={Register}/>
            <RedirectRoute path="/logout" exact component={Logout}/>
            <RedirectRoute path="/home" component={HomePage}/>
            <RedirectRoute path="/create-post" component={CreateArticlePage}/>
            <RedirectRoute path="/article/:id" component={FullArticlePage}/>
            <RedirectRoute path="/edit/:id" component={EditArticlePage}/>
            <RedirectRoute path="/user/:id" component={ProfilePage}/>
            <RedirectRoute path="/liked-posts" component={LikedPostsPage}/>
            <RedirectRoute path="/search-results" component={SearchResultsPage}/>
            <AdminRoute path="/admin/users" component={AdminPage}/>
          </Switch>
        </Router>
        <ToastContainer/>
      </div>
    )
  }
}

export default App;