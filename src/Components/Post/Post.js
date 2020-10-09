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

                <p className="post_text"> {this.props.post.content} </p>

                {this.props.user.id === this.props.post.author_id ? (<ul className="post_container" key={this.props.post.post_id}>

                    {this.state.isEditing === true ?
                        <div>

                            <div>
                                <input
                                    className="input_post"
                                    value={this.state.userInput}
                                    onChange={(e) => {
                                        this.handleChange(e)
                                    }}
                                ></input>
                            </div>

                            <div className="post_edit">
                                <a
                                    className="post_edit"
                                    onClick={() => {
                                        this.handleCancel()
                                    }}
                                >
                                    Cancel
                                </a>
                                <a
                                    className="post_edit"
                                    onClick={() => {
                                        this.handleSave()
                                    }}
                                >
                                    Save
                                </a>
                            </div>
                        </div>

                        :

                        <div className="post_buttons">
                            {this.props.user.id === this.props.post.author_id && (
                                <a
                                    className="button5"
                                    onClick={() => {
                                        this.toggleEdit()
                                    }}
                                >
                                    Edit
                                </a>
                            )}

                            {this.props.user.id === this.props.post.author_id && (
                                <a
                                    className="button5"
                                    onClick={() => {
                                        this.props.handleDelete(this.props.post.id)
                                    }}
                                >
                                    Delete
                                </a>
                            )}
                        </div>}

                </ul>) : null}

                <div className='author_comment_box'>

                    <img src={'https://robohash.org/' + this.props.user.first_name} alt='author' />

                    <p>by {this.props.user.first_name}</p>

                </div>

                <div>
                    <section className="comment_box">{mapComments}</section>
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
                    <a
                        onClick={() => {
                            this.props.handleCommentClick(this.props.post.id, this.state.commentInput)
                        }}
                        className="button9"
                    >
                        Submit
                    </a>
                    <div>
                        <section className="post_box">{}</section>
                    </div>

                </div >

            </>

        )

    }

}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Post)