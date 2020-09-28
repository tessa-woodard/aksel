import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { loginUser } from '../../ducks/authReducer'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleLogin = (e) => {
        const { email, password } = this.state
        axios
            .post('/login', { email, password })
            .then((res) => {
                this.props.loginUser(res.data)
                this.props.history.push('/dashboard')
            })
            .catch((err) => {
                alert(err.message)
            })
    }

    render() {
        return (
            <div className='Login'>
                <div className='login_container'>

                    <h1 className='login_title'>Aksel</h1>

                    <div className="login_input_box">
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

                    <div className='login_button_container'>
                        <button className='dark_button' onClick={() => { this.handleLogin() }}> Login </button>

                        <span> I don't have an account. </span>

                        <button className='black_button' onClick={() => { this.props.history.push('/register') }} > Sign Up! </button>
                    </div>
                </div>
            </div >
        );
    }
}

export default connect(null, { loginUser })(Login)