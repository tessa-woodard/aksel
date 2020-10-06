import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import Comment from '../Comment/Comment'

class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditing: false,
            isDeleting: false,
            userInput: '',
            commentInput: '',
        }
    }

    handleCancel = () => {
        this.setState({
            isEditing: !this.state.isEditing,
        })
    }

    handleChange = (e) => {
        this.setState({
            userInput: e.target.value,
        })
    }

    handleSave = () => {
        this.props.handleEdit(this.props.post.id, this.state.userInput)
        this.toggleEdit()
    }

    toggleEdit = () => {
        this.setState({
            isEditing: !this.state.isEditing,
        })
    }

    handleCommentChange = (e) => {
        this.setState({
            commentInput: e.target.value
        })
    }

    handleCommentEdit = (comment_id, content) => {
        axios.put(`/comments/${comment_id}`, { content }).then((res) => {
            this.props.getPosts()
        })
    }

    handleCommentDelete = (comment_id) => {
        axios.delete(`/comments/${comment_id}`).then((res) => {
            this.props.getPosts()
        })
    }

    render() {
        const mapComments = this.props.post.comments.map((comment) => {
            return (

                <Comment
                    key={comment.id}
                    post={this.props.post}
                    comment={comment}
                    handleCommentEdit={this.handleCommentEdit}
                    handleCommentDelete={this.handleCommentDelete}

                />

            )

        })

        return (

            <>

                <p className="post-comment-text"> {this.props.post.content} </p>

                {this.props.user.id === this.props.post.author_id ? (<ul className="post-container" key={this.props.post.post_id}>

                    {this.state.isEditing === true ?
                        <div>

                            <div>
                                <input
                                    value={this.state.userInput}
                                    onChange={(e) => {
                                        this.handleChange(e)
                                    }}
                                ></input>
                            </div>

                            <div className="dark_button">
                                <button
                                    className="input-container-button-small"
                                    onClick={() => {
                                        this.handleCancel()
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="input-container-button-small"
                                    onClick={() => {
                                        this.handleSave()
                                    }}
                                >
                                    Save
                                </button>
                            </div>
                        </div>

                        :

                        <div className="post-buttons">
                            {this.props.user.id === this.props.post.author_id && (
                                <button
                                    className="dark_button"
                                    onClick={() => {
                                        this.toggleEdit()
                                    }}
                                >
                                    Edit
                                </button>
                            )}

                            {this.props.user.id === this.props.post.author_id && (
                                <button
                                    className="dark_button"
                                    onClick={() => {
                                        this.props.handleDelete(this.props.post.id)
                                    }}
                                >
                                    Delete
                                </button>
                            )}
                        </div>}

                </ul>) : null}

                <div className='content_box dash_comment_box'>
                    <div className='author_comment_box'>
                        <p>by {this.props.user.first_name} </p>
                        <img alt='author' />
                    </div>
                </div>

                <div>
                    <section className="comment-box">{mapComments}</section>
                </div>

                <div className="input-comment-container">
                    <textarea
                        id="new-comment"
                        cols="60"
                        rows="2"
                        placeholder="Write a comment..."
                        value={this.state.commentInput}
                        onChange={(e) => {
                            this.handleCommentChange(e)
                        }}
                    />
                    <button
                        onClick={() => {
                            this.props.handleCommentClick(this.props.post.id, this.state.commentInput)
                        }}
                        className="dark_button"
                    >
                        Submit
                    </button>
                    <div>
                        <section className="post-box">{}</section>
                    </div>

                </div >

            </>

        )

    }

}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Post)