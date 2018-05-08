import React from 'react';
import PT from 'prop-types';
import { Comments, AddComment } from './index';
import { Link } from "react-router-dom";
import * as API from '../API';
import '../css/articles.css'

class Article extends React.Component {
    state = {
        hidden: true,
        hideAddComment: true,
        vote: ''
    }
    render() {
        const { currentUser, articles } = this.props
        const { vote, hidden, hideAddComment } = this.state
        const { articleId } = this.props.match.params
        const article = articles.find(article => article._id === articleId)
        return (
            <div>
                <div id="article" key={article._id}>
                    <p id="articleTitle"><strong>{article.title}</strong></p>
                    <p id="info"><em>
                        Author: {article.created_by.username} <br />
                        <Link to={`/topics/${article.belongs_to.title.toLowerCase()}`}>{article.belongs_to.title}</Link> </em>
                    </p>
                    <p id="articleBody">{article.body}</p>
                    <div className="counter">
                        <li onClick={this.handleClick} id="count" className="click"><i className="fa fa-commenting-o"></i> {article.commment_count} </li>
                        <li id="count"><i className="fa fa-heart-o"></i> {article.votes} </li>
                        <div hidden={currentUser && currentUser.username === article.created_by.username ? true : false}>
                            <div hidden={vote === "down" ? true : false}>
                                <div onClick={() => this.handleArticleVote(article._id, 'up')} className="click" id={vote === "up" ? "voted" : "addComment"}>
                                    <i className="fa fa-thumbs-o-up"></i>
                                </div>
                            </div>
                            <div hidden={vote === "up" ? true : false}>
                                <div onClick={() => this.handleArticleVote(article._id, 'down')} className="click" id={vote === "down" ? "voted" : "addComment"}>
                                    <i className="fa fa-thumbs-o-down"></i>
                                </div>
                            </div>
                        </div>
                        <li onClick={this.handleComment} id="addComment" className="click"><i className="fa fa-pencil"></i></li>
                    </div>
                </div>
                <Comments currentUser={currentUser} articleId={articleId} hidden={hidden} />
                <AddComment articleId={articleId} currentUser={currentUser} hideAddComment={hideAddComment} />
            </div>
        );
    }

    handleArticleVote = (articleId, voted) => {
        const {vote } = this.state
        if (vote === '') {
            API.putArticleVote(articleId, voted)
                .then(res => console.log(res))
            this.setState({
                vote: voted
            })
        } else alert('You have already voted')
    }

    handleClick = () => {
        this.setState({
            hidden: !this.state.hidden
        })
    }

    handleComment = () => {
        const { currentUser } = this.props
        if (Object.keys(currentUser).length === 0) {
            alert('You must be logged in')
        }
        else {
            this.setState({
                hideAddComment: !this.state.hideAddComment
            })
        }
    }

    static propTypes = {
        currentUser: PT.object.isRequired,
        articles: PT.array.isRequired
    }
}
export default Article;