import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { logoutUser } from '../../ducks/authReducer'

function Nav(props) {
    if (props.location.pathname !== '/login' & '/register') {
        console.log('nav', props)
        return (
            <div className='Nav'>
                <div className='nav_profile_container'>
                    <div className='nav_profile_pic'></div>
                    <p>{props.first_name}</p>
                </div>
                <Link to='/' onClick={props.logout}><img className='nav_img logout' alt='logout' /></Link>
            </div>
        )
    } else {
        return null
    }
}
function mapStateToProps(state) {
    return state
}
export default withRouter(connect(mapStateToProps, { logoutUser })(Nav))