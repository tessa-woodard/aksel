import React from 'react'
import { connect } from 'react-redux'

class Comment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showingComment: false,
            enableEditing: false,
            enableDeleting: false,
            commentInput: '',
        }
    }

    handleCommentCancel = () => {
        this.setState({
            enableEditing: !this.state.enableEditing,
        })
    }

    handleCommentChange = (e) => {
        this.setState({
            commentInput: e.target.value,
        })
    }

    handleCommentSave = () => {
        this.props.handleCommentEdit(this.props.comment.id, this.state.commentInput)
        this.toggleCommentEdit()
    }

    toggleCommentEdit = () => {
        this.setState({
            enableEditing: !this.state.enableEditing,
        })
    }

    render() {

        return (

            <>

                <p>{this.props.comment.content}</p>

                {this.props.user.id === this.props.post.author_id ? (<ul className="post-container" key={this.props.comment.id}>

                    {this.state.enableEditing === true ?
                        <div>

                            <div>
                                <input
                                    value={this.state.commentInput}
                                    onChange={(e) => {
                                        this.handleCommentChange(e)
                                    }}
                                ></input>
                            </div>

                            <div className="comme t_edit">
                                <a
                                    className="comment_edit"
                                    onClick={() => {
                                        this.handleCommentCancel()
                                    }}
                                >
                                    Cancel
                    </a>
                                <a
                                    className="comment_edit"
                                    onClick={() => {
                                        this.handleCommentSave()
                                    }}
                                >
                                    Save
                    </a>
                            </div>
                        </div>

                        :

                        <div className="post-buttons">
                            {this.props.user.id === this.props.post.author_id && (
                                <a
                                    className="comment_delete"
                                    onClick={() => {
                                        this.toggleCommentEdit()
                                    }}
                                >
                                    Edit
                                </a>
                            )}

                            {this.props.user.id === this.props.post.author_id && (
                                <a
                                    className="comment_delete"
                                    onClick={() => {
                                        this.props.handleCommentDelete(this.props.comment.id)
                                    }}
                                >
                                    Delete
                                </a>
                            )}
                        </div>}

                </ul>) : null}
            </>


        )
    }

}

const mapStateToProps = (state) => state

export default connect(mapStateToProps)(Comment)
