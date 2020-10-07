import React from 'react'
import axios from 'axios'
import { getUser } from '../../ducks/authReducer'
import { connect } from 'react-redux'

import Shift from './Shift'

class Schedule extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            empSchedule: [],
            shifts: []
        }
    }

    componentDidMount() {
        if (!this.props.isLoggedIn) {
            this.props.getUser().catch((err) => {
                this.props.history.push('/')
            })
        }
        this.getShifts()
    }

    getShifts = () => {
        axios.get('/schedule').then((res) => {
            this.setState({
                shifts: res.data
            })
        })
    }

    render() {

        return (
            <Shift
                getSchedule={this.getSchedule}
                empSchedules={this.state.shifts}

            />
        )
    }

}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, { getUser })(Schedule)