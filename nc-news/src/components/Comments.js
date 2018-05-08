import React from 'react';
import PT from 'prop-types';
import * as API from '../API';
import '../css/comments.css';
import { Comment, AddComment } from './index';

class Comments extends React.Component {
    state = {
        comments: [],
        vote: '',
        votedComments: [],
        comment: ''
    }

    componentDidMount = () => {
        API.getArticleComments(this.props.articleId)
            .then(comments => {
                this.setState({
                    comments
                })
            })
            .catch(console.error)
    }

    // componentWillReceiveProps(newProps) { 
    //     API.getArticleComments(newProps.articleId)
    //         .then(comments => {
    //             this.setState({
    //                 comments
    //             })
    //         })
    // }

    componentDidUpdate(newProps) {
        API.getArticleComments(newProps.articleId)
            .then(comments => {
                this.setState({
                    comments
                })
            })
    }

    render() {
        const { currentUser, hidden, articleId, hideAddComment } = this.props
        const { votedComments, comments } = this.state
        return (
            <div>
                <div hidden={hidden} className="commentsBox">
                    {comments.sort((a, b) => b.votes - a.votes).map(comment => (
                        <Comment hideCommentVote={this.hideCommentVote} handleCommentVote={this.handleCommentVote} comment={comment} currentUser={currentUser} votedComments={votedComments} />
                    ))}
                </div>
                <AddComment addNewComment={this.addNewComment} handleChange={this.handleChange} articleId={articleId} currentUser={currentUser} hideAddComment={hideAddComment} />
            </div>
        );
    }

    addNewComment = (event) => {
        const { currentUser, articleId, updateCommentCount } = this.props
        const { comment } = this.state
        console.log({
            comment,
            created_by: currentUser._id,
        })
        event.preventDefault()
        API.postComment(articleId, {
            comment,
            created_by: currentUser._id,
        })
        // .then(() => {
        //     updateCommentCount()
        // })
        .catch(console.log)
    }

    handleChange = (event) => {
        this.setState({
            comment: event.target.value
        })
    }

    handleCommentVote = (commentId, vote) => {
        const { votedComments } = this.state
        if (!votedComments.includes(commentId)) {
            votedComments.push(commentId)
            API.putCommentVote(commentId, vote)
            this.setState({
                vote,
                votedComments
            })
        } else alert('You have already voted')
    }

    hideCommentVote = (commentId, voted) => {
        const { votedComments, vote } = this.state
        return votedComments.includes(commentId) && vote === voted ? true : false
    }

    static propTypes = {
        currentUser: PT.object.isRequired,
        hidden: PT.bool.isRequired
    }
}

export default Comments;