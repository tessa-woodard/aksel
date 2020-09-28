import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { loginUser } from '../../ducks/authReducer'

class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            profile_picture: ''
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,

        })
    }

    login = (e) => {
        const { email, password } = this.state
        axios
            .post('/auth/login', { email, password })
            .then(res => {
                this.props.loginUser(res.data)
                this.props.history.push('/dashboard')
            })
            .catch((err) => {
                alert(err.message)
            })
    }
    register = () => {
        const { email, password, first_name, last_name, profile_picture } = this.state
        axios

            .post('/auth/register', { email, password, first_name, last_name, profile_picture })
            .then(res => {
                this.props.loginUser(res.data)
                this.props.history.push('/dashboard')
            })
            .catch((err) => {
                alert(err.message)
            })
    }
    render() {
        return (
            <div className='Auth'>
                <div className='auth_container'>

                    <h1 className='auth_title'>Aksel</h1>
                    <div className='auth_input_box'>
                        <p>Username:</p>
                        <input name='email' onChange={(e) => { this.handleChange(e) }} />
                    </div>
                    <div className='auth_input_box'>
                        <p>Password:</p>
                        <input name='password' onChange={(e) => { this.handleChange(e) }} type='password' />
                    </div>
                    <div className='auth_button_container'>
                        <button className='dark_button' onClick={() => { this.login() }}> Login </button>
                        <button className='dark_button' onClick={() => { this.register() }}> Sign up </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, { loginUser })(Auth)