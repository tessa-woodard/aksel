import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import logoutLogo from './shut_down.png'
import scheduleLogo from './schedule_logo.png'

import { logoutUser } from '../../ducks/authReducer'

function Nav(props) {
    if (props.location.pathname !== '/login') {
        return (
            <div className='Nav'>
                <div className='nav_profile_container'>
                    <div className='nav_profile_pic'></div>
                    <p>{props.user.first_name}</p>
                </div>

                <div className='nav-links'>
                    <Link to='/schedule'><img className='schedule_img' src={scheduleLogo} alt="schedule" />
                    </Link>
                </div>

                <Link to='/' onClick={props.logout}><img className='nav_img logout' src={logoutLogo} alt='logout' />
                </Link>

            </div >
        )
    } else {
        return null
    }
}
function mapStateToProps(state) {
    return state
}
export default withRouter(connect(mapStateToProps, { logoutUser })(Nav))