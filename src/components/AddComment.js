import React from 'react';
import PT from 'prop-types';
import '../css/addComment.css'

class AddComment extends React.Component {
    state = {
        comment: ''
    }
    render() {
        const { hideAddComment, addNewComment, handleChange} = this.props
        return (
            <div hidden={hideAddComment}>
                <div id="form-div">
                    <form onSubmit={addNewComment} className="form" id="form1">
                        <p className="text">
                            <textarea onChange={handleChange} name="text" className="feedback-input" id="comment" placeholder="Comment"></textarea>
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

    static propTypes = {
        hideAddComment: PT.bool.isRequired,
        currentUser: PT.object.isRequired,
        articleId: PT.string.isRequired
    }
}

export default AddComment;