import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Typed from 'react-typed'

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

                    <div className="login_input_container">
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

                    <a className='button2' onClick={() => { this.handleLogin() }}> Login </a>

                </div>

                <div className="login_info_container">

                    <div className="aksel_container">
                        <Typed
                            strings={['Aksel']}
                            typeSpeed={120}
                            backSpeed={120}
                            loop={true}
                            cursorChar={"|"}
                        />

                    </div>


                    <div className='register_button_container'>

                        <span> Don't have <br /> an account? </span>

                        <a className='button2' onClick={() => { this.props.history.push('/register') }} > Sign Up! </a>

                    </div>

                </div>

            </div >
        );
    }
}

export default connect(null, { loginUser })(Login)