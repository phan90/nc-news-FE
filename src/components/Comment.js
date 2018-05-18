import React from 'react';
import moment from 'moment';
import * as API from '../API';

class Comment extends React.Component {
    state = {
        vote: '',
        votedComments: []

    }
    render() {
        const { comment, currentUser } = this.props
        const { votedComments } = this.state
        return (
            <div key={comment._id} className="comment">
                <div className="head">
                    <img alt="commentImg" id="commentImg" src={`${comment.created_by.avatar_url}`} /> {comment.created_by.username}
                </div>
                <p id="commentBody">
                    {comment.body}
                </p>
                <p id="commentTime">
                    <i className="fa fa-clock-o"></i> {moment(comment.created_at).fromNow()}
                </p>
                <div className="votes">
                    <li id="vote">
                        <i className="fa fa-heart-o"></i> {comment.votes}
                    </li>
                    {/* fa fa-thumbs-down */}
                    {currentUser && currentUser.username === comment.created_by.username ?
                        <div className="click" id="addVote" onClick={() => this.deleteComment(comment._id)}>
                            <i className="fa fa-trash-o"></i>
                        </div> :
                        <div>
                            <div onClick={() => this.handleCommentVote(comment._id, 'up')} hidden={this.hideCommentVote(comment._id, 'down')} className="click" id="addVote">
                                <i className={!votedComments.includes(comment._id) ? "fa fa-thumbs-o-up" : "fa fa-check"}></i>
                            </div>
                            <div onClick={() => this.handleCommentVote(comment._id, 'down')} hidden={this.hideCommentVote(comment._id, 'up')} className="click" id="addVote">
                                <i className={!votedComments.includes(comment._id) ? "fa fa-thumbs-o-down" : "fa fa-check"}></i>
                            </div>
                        </div>}
                </div>
            </div>
        );


    }

    deleteComment = (commentId) => {
        const {updateCommentCount} = this.props
        API.deleteComment(commentId)
            .then(() => {
                updateCommentCount(-1)
            })
    }

    handleCommentVote = (commentId, vote) => {
        let { votedComments } = this.state
        if (!votedComments.includes(commentId)) {
            votedComments.push(commentId)
            API.putCommentVote(commentId, vote)
            this.setState({
                vote,
                votedComments,
            })
        } else alert('You have already voted')
    }

    hideCommentVote = (commentId, voted) => {
        const { votedComments, vote } = this.state
        return votedComments.includes(commentId) && vote === voted ? true : false
    }

}

export default Comment;