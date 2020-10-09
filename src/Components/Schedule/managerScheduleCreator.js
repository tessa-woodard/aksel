import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getUser } from '../../ducks/authReducer'

import EditScheduleRow from './editScheduleRow'

class managerScheduleCreator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            monday: '',
            tuesday: '',
            wednesday: '',
            thursday: '',
            friday: '',
            saturday: '',
            sunday: '',
            insertShift: '',
            empSchedules: [],
            selectedShiftId: '',
            selectedEmpSchedule: '',
        }
    }

    componentDidMount() {
        if (!this.props.isLoggedIn) {
            this.props.getUser().catch((err) => {
                this.props.history.push('/')
            })
        }
        this.getSchedule()
    }

    getSchedule = () => {
        axios.get('/schedule').then((res) => {
            this.setState({
                empSchedules: res.data
            })
        })
    }

    handleShiftAdd = (shift_id, week_day, shift_time) => {
        axios.post('/schedule', { shift_id, week_day, shift_time }).then((res) => {
            this.setState({
                empSchedule: res.data,
            })
        })
    }

    handleShiftEdit = (shift_id, shift_time) => {
        axios.put(`/schedule/${shift_id}`, { shift_time }).then((res) => {
            this.props.getShifts()
        })
    }

    // handleShiftDelete = (shift_id) => {
    //     axios.delete(`/schedule/${shift_id}`).then((res) => {
    //         const updatedEmpSchedules = this.state.week_day.map((week_day, shift_time) => {
    //             if (week_day === shift_time) {
    //                 week_day.monday = ""
    //                 week_day.tuesday = ""
    //                 week_day.wednesday = ""
    //                 week_day.thursday = ""
    //                 week_day.friday = ""
    //                 week_day.saturday = ""
    //                 week_day.sunday = ""
    //                 this.setState({ selectedEmpSchedule: shifts })
    //             }
    //             return shifts
    //         })
    //         this.setState({ empSchedules: updatedEmpSchedules })
    //     })
    // }

    clearStates() {
        this.setState({ monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "", sunday: "", selectedEmpSchedule: "", selectedShiftId: "" })
    }

    render() {
        return (
            <div className="col m12" id="schedule-build">
                <div className="section">
                    <h5 className="schedule_title" id="sch-editor">Schedule Editor</h5>
                    <table>
                        <thead>
                            <tr>
                                <th data-field="name">Name</th>
                                <th data-field="name">Mon</th>
                                <th data-field="name">&#160;&#160;Tue</th>
                                <th data-field="name">&#160;&#160;Wed</th>
                                <th data-field="name">&#160;&#160;Thu</th>
                                <th data-field="name">&#160;&#160;&#160;Fri</th>
                                <th data-field="name">&#160;&#160;Sat</th>
                                <th data-field="name">&#160;&#160;Sun</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.empSchedules.map((employee) => {
                                return (
                                    <EditScheduleRow
                                        employee={employee}
                                        getSchedule={this.getSchedule}
                                        key={employee.id}
                                    />
                                )
                            }, this)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, { getUser })(managerScheduleCreator)