import React from 'react';
import PT from 'prop-types';
import '../css/profile.css';
import { Link } from "react-router-dom";

class Profile extends React.Component {
    state = {
        hidden: true
    }
    render() {
        const {currentUser, logOut, articles} = this.props
        const userArticles = articles.filter(article => article.created_by.username === currentUser.username)
        return (
            <div className="profile">
                <img alt="userAvatar" id="userAvatar" src={currentUser.avatar_url} />
                <div id="fullname">Welcome back {currentUser.name}!</div>
                <div id="username">Username: {currentUser.username}</div>
                <br />
                <button id="userArticles" onClick={this.hideArticles}>Posted Articles</button>
                <button id="logOut" onClick={logOut}>Log Out</button>
                <div hidden={this.state.hidden}>
                    {userArticles.map(article =>
                        <div id="article" key={article._id}>
                            <Link to={`/articles/${article._id}`}>
                                <p id="articleTitle"><strong>{article.title}</strong></p>
                            </Link>
                            <p id="info">
                                <em>
                                    Author: {article.created_by.username}
                                </em>
                                <br />
                                <Link to={`/topics/${article.belongs_to.title.toLowerCase()}`}>
                                    {article.belongs_to.title}
                                </Link>
                            </p>
                            <p id="articleBody">{article.body.slice(0, 300)}...</p>
                            <div className="counter">
                                <li id="count">
                                    <i className="fa fa-commenting-o"></i> {article.commment_count}
                                </li>
                                <li id="count">
                                    <i className="fa fa-heart-o"></i> {article.votes}
                                </li>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    hideArticles = () => {
        this.setState({
            hidden: !this.state.hidden
        })
    }

    static propTypes = {
        currentUser: PT.object.isRequired,
        logOut: PT.func.isRequired
    }
}

export default Profile;