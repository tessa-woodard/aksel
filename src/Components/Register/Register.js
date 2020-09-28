import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { loginUser } from '../../ducks/authReducer'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            profile_picture: ''
        }
        this.handleRegister = this.handleRegister.bind(this)
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleRegister = () => {
        const { first_name, last_name, email, password } = this.state
        axios
            .post('/register', { first_name, last_name, email, password })
            .then((res) => {
                this.props.loginUser(res.data)
                this.props.history.push('/login')
            })
            .catch((err) => {
                alert(err.message)
            })
    }

    render() {
        return (
            <div className='Register'>
                <div className='register_container'>

                    <h1 className='register_title'>Aksel</h1>

                    <div className="register_input_box">

                        <p>First Name:</p>
                        <input
                            type="firstname"
                            maxLength="20"
                            placeholder="Enter First Name"
                            name="firstname"
                            onChange={(e) => {
                                this.handleInput(e)
                            }}
                        />
                        <p>Last Name:</p>
                        <input
                            type="lastname"
                            maxLength="20"
                            placeholder="Enter Last Name"
                            name="lastname"
                            onChange={(e) => {
                                this.handleInput(e)
                            }}
                        />
                        <p>Email:</p>
                        <input
                            maxLength="100"
                            placeholder="Enter Email"
                            name="email"
                            onChange={(e) => {
                                this.handleInput(e)
                            }}
                        />
                        <p>Password:</p>
                        <input
                            type="password"
                            maxLength="20"
                            placeholder="Enter Password"
                            name="password"
                            onChange={(e) => {
                                this.handleInput(e)
                            }}
                        />
                    </div>

                    <div className='register_button_container'>
                        <button className='dark_button' onClick={() => { this.handleRegister() }}> Submit </button>

                        <span> Already have an account? </span>

                        <button
                            className='dark_button' onClick={() => { this.props.history.push('/') }}> Login </button>
                    </div>
                </div>
            </div >
        );
    }
}

export default connect(null, { loginUser })(Register)