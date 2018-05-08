import React from 'react';
import PT from 'prop-types';
import * as API from '../API';
import '../css/addComment.css'

class AddComment extends React.Component {
    state = {
        comment: ''
    }
    render() {
        const { hideAddComment } = this.props
        return (
            <div hidden={hideAddComment}>
                <div id="form-div">
                    <form onSubmit={this.addNewComment} className="form" id="form1">
                        <p className="text">
                            <textarea onChange={this.handleChange} name="text" className="feedback-input" id="comment" placeholder="Comment"></textarea>
                        </p>
                        <div className="submit">
                            <input type="submit" value="SEND" id="button-blue" />
                            <div className="ease"></div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    addNewComment = (event) => {
        const { currentUser, articleId } = this.props
        const { comment } = this.state
        event.preventDefault()
        API.postComment(articleId, {
            comment,
            created_by: currentUser._id
        })
    }

    handleChange = (event) => {
        this.setState({
            comment: event.target.value
        })
    }

    static propTypes = {
        hideAddComment: PT.bool.isRequired,
        currentUser: PT.object.isRequired,
        articleId: PT.string.isRequired
    }
}

export default AddComment;