import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { logoutUser } from '../../ducks/authReducer'

function Nav(props) {
    if (props.location.pathname !== '/') {
        return (

            <div className='Nav'>

                <div className='nav_profile_container'>
                    <div className='nav_profile_pic' style={{ backgroundImage: `url('https://robohash.org/${props.user.first_name}')` }}></div>
                    <p className='nav_user'>{props.user.first_name}</p>

                </div>

                <a className='button1'>
                    <Link to='/schedule'>Schedule
                    </Link>
                </a>

                {props.user.is_manager ? <a className='button1'>
                    <Link to='/schedule/editor'>Manage Schedule
                    </Link>
                </a> : null}


                <a className='button1'>
                    <Link to='/chat'>Chat
                    </Link>
                </a>


                <a className='button1'>
                    <Link to='/dashboard'>Home
                    </Link>
                </a>

                <a className='button1'>
                    <Link to='/'>Logout
                    </Link>
                </a>


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