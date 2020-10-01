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
            search: '',
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
            search: e.target.value,
            userInput: e.target.value,
        })
    }

    getPosts = () => {
        let { search, posts } = this.state
        let url = "/posts"

        if (posts && !search) {
            url += "?user_posts=true&search="
        } else if (!posts && search) {
            url += `?user_posts=false&search=${search}`
        } else if (posts && search) {
            url += `?user_posts=true&search=${search}`
        } else if (!posts && !search) {
            url += "?user_posts=false&search="
        }
        axios.get(url).then((res) => {
            this.setState({
                posts: res.data,
                userInput: this.props.content,
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

    reset() {
        let url = "/posts/"
        if (this.state.posts) {
            url += "?user_posts=true&search="
        }
        axios.get(url).then((res) => {
            this.setState({ posts: res.data, search: "" })
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
        const mapPosts = this.state.posts.map((post, index) => {
            return (

                <li className="post-container" key={post.id}>

                    <div>
                        <p className="post-text">{this.state.content}</p>
                    </div>

                    <div className='content_box dash_post_box'>
                        <h3>{this.title}</h3>
                        <div className='author_box'>
                            <p>by {post.first_name} </p>
                            <img alt='author' />
                        </div>
                    </div>

                    <Post
                        post={post}
                        key={post.id}
                        handleEdit={this.handleEdit}
                        handleDelete={this.handleDelete}
                    />

                </li>
            )
        })

        return (
            <div className="input-container">

                <div className='dash_search_box'>

                    <input onChange={(e) => this.handleChange(e)} className='dash_search_bar' placeholder='Search by Title' />

                    {/* <img onClick={this.getPosts} className='dash_search_button' src={searchLogo} alt='search' /> */}

                    <button onClick={this.reset} className='dark_button' id='dash_reset'>Reset</button>

                </div>

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
                <button
                    onClick={() => {
                        this.handleClick()
                    }}
                    className="dark_button"
                >
                    Submit
                </button>
                <div>
                    <section className="post-box">{mapPosts}</section>
                </div>
            </div>

        )
    }

}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, { getUser })(Dashboard)