import React, { Component } from 'react'
import axios from 'axios'
import { getUser } from '../../ducks/authReducer'
import { connect } from 'react-redux'

import Post from '../Post/Post'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            userInput: '',
        }
    }

    componentDidMount() {
        if (!this.props.isLoggedIn) {
            this.props.getUser().catch((err) => {
                this.props.history.push('/')
            })
        }
        this.getPosts()
    }

    handleChange = (e) => {
        this.setState({
            userInput: e.target.value,
        })
    }

    getPosts = () => {
        axios.get('/posts').then((res) => {
            this.setState({
                posts: res.data,
            })
        })
    }

    getComments = () => {
        axios.get('/comments').then((res) => {
            this.setState({
                comments: res.data,
            })
        })
    }

    handleClick = () => {
        const { userInput: content } = this.state
        axios.post('/posts/', { content }).then((res) => {
            this.setState({
                posts: res.data,
                userInput: '',
            })
        })
    }

    handleCommentClick = (post_id, content) => {
        axios.post('/comments', { content, post_id }).then((res) => {
            this.getPosts()
        })
    }

    handleEdit = (post_id, content) => {
        axios.put(`/posts/${post_id}`, { content }).then((res) => {
            this.setState({
                posts: res.data,
            })
        })
    }

    handleDelete = (post_id) => {
        axios.delete(`/posts/${post_id}`).then((res) => {
            this.setState({
                posts: res.data,
            })
        })
    }

    render() {
        const mapPosts = this.state.posts.map((post) => {

            return (

                <div className="post-container" key={post.id}>

                    <p>{this.state.content}</p>

                    <img className="post_profile_pic" src={'https://robohash.org/' + post.first_name} alt='author' />

                    <p className="post_author">by {post.first_name} </p>

                    <Post
                        post={post}
                        key={post.id}
                        getPosts={this.getPosts}
                        handleEdit={this.handleEdit}
                        handleDelete={this.handleDelete}
                        handleCommentClick={this.handleCommentClick}
                        handleCommentEdit={this.props.handleCommentEdit}
                        handleCommentDelete={this.handleCommentDelete}
                    />

                </div>

            )

        })

        return (
            <div className="input-container">

                <textarea
                    id="new-post"
                    cols="60"
                    rows="2"
                    placeholder="What's on your mind?"
                    value={this.state.userInput}
                    onChange={(e) => {
                        this.handleChange(e)
                    }}
                />
                <a className='button3'
                    onClick={() => {
                        this.handleClick()
                    }}
                >
                    Submit
                </a>

                <div>
                    <section className="post_box">{mapPosts}</section>
                </div>

            </div>



        )
    }

}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, { getUser })(Dashboard)