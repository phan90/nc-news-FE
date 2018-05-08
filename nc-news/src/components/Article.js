import React from 'react';
import PT from 'prop-types';
import { Comments } from './index';
import { Link } from "react-router-dom";
import * as API from '../API';
import '../css/articles.css'

class Article extends React.Component {
    state = {
        hidden: true,
        hideAddComment: true,
        vote: '',
        votes: this.props.articles.find(article => article._id === this.props.match.params.articleId).votes,
        commentCount: this.props.articles.find(article => article._id === this.props.match.params.articleId).commment_count
    }

    render() {
        const { currentUser, articles } = this.props
        const { vote, hidden, hideAddComment, votes, commentCount } = this.state
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
                        <li onClick={this.handleClick} id="count" className="click"><i className="fa fa-commenting-o"></i> {commentCount} </li>
                        <li id="count"><i className="fa fa-heart-o"></i> {votes} </li>
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
                <Comments updateCommentCount={this.updateCommentCount} currentUser={currentUser} articleId={articleId} hidden={hidden} hideAddComment={hideAddComment}/>
                {/* <AddComment articleId={articleId} currentUser={currentUser} hideAddComment={hideAddComment} /> */}
            </div>
        );
    }

    updateCommentCount = () => {
        this.setState({
            commentCount: this.state.commentCount+1
        })
    }

    handleArticleVote = (articleId, voted) => {
        let { vote, votes } = this.state
        votes = voted === 'up' ? votes + 1 : votes - 1
        if (vote === '') {
            API.putArticleVote(articleId, voted)
            this.setState({
                vote: voted, 
                votes
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