import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Typed from 'react-typed'

import { loginUser } from '../../ducks/authReducer'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            profile_picture: '',
            position: '',
        }
        this.handleRegister = this.handleRegister.bind(this)
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleRegister = () => {
        const { first_name, last_name, email, password, position } = this.state
        axios
            .post('/register', { first_name, last_name, email, password, position })
            .then((res) => {
                this.props.loginUser(res.data)
                this.props.history.push('/login')
            })
            .catch((err) => {
                alert(err.message)
            })
    }

    handleUserChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className='Register'>
                <div className='register_container'>

                    <div className="register_input_container">

                        <p>First Name:</p>
                        <input
                            type="firstname"
                            maxLength="20"
                            placeholder="Enter First Name"
                            name="first_name"
                            onChange={(e) => {
                                this.handleInput(e)
                            }}
                        />
                        <p>Last Name:</p>
                        <input
                            type="lastname"
                            maxLength="20"
                            placeholder="Enter Last Name"
                            name="last_name"
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

                        <div className="position_input">
                            <div className="col s12">
                                <div className="input-field col m6 s6">
                                    <select className="browser-default validate" name="position" value={this.state.position} onChange={this.handleUserChange} required>
                                        <option value="" disabled>Position</option>
                                        <option value="manager">Manager</option>
                                        <option value="employee">Employee</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <a className='button2' onClick={() => { this.handleRegister() }}> Submit </a>

                    </div>

                </div>

                <div>

                    <div className="aksel_container">
                        <Typed
                            strings={['Aksel']}
                            typeSpeed={120}
                            backSpeed={120}
                            loop={true}
                            cursorChar={"|"}
                        />

                    </div>

                    <div className="login_button_container">

                        <span> Already have an account? </span>

                        <a className='button2' onClick={() => { this.props.history.push('/login') }}> Login </a>

                    </div>

                </div>
            </div>

        );
    }
}

export default connect(null, { loginUser })(Register)