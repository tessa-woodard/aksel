import React from 'react'
import axios from 'axios'

class EditScheduleRow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Monday: 'OFF',
            Tuesday: 'OFF',
            Wednesday: 'OFF',
            Thursday: 'OFF',
            Friday: 'OFF',
            Saturday: 'OFF',
            Sunday: 'OFF'
        }
        this.handleScheduleSave = this.handleScheduleSave.bind(this)
    }

    componentDidMount() {
        this.setState(state => ({ ...state, ...this.props.employee.schedule }))
    }

    handleUserChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleScheduleSave() {
        axios.put(`/schedule/${this.props.employee.id}`, this.state).then(() => {
            this.props.getSchedule()
        })
    }

    render() {
        const { employee } = this.props
        return (
            <tr className="table_row" key={employee.id}>
                <td className="fullName" id={employee.id}>
                    {employee.first_name} {employee.last_name}
                </td>
                <td>
                    <div className="input-field schedule">
                        <select className="browser-default schedule" name="Monday" value={this.state.Monday} onChange={e => this.handleUserChange(e)}>
                            <option value=""></option>
                            <option value="OFF">OFF</option>
                            <option value="8am-5pm">8am-5pm</option>
                            <option value="9am-6pm">9am-6pm</option>
                            <option value="10am-7pm">10am-7pm</option>
                            <option value="11am-8pm">11am-8pm</option>
                            <option value="12pm-9pm">12pm-9pm</option>
                            <option value="1pm-10pm">1pm-10pm</option>
                            <option value="2pm-11pm">2pm-11pm</option>
                            <option value="3pm-12am">3pm-12am</option>
                        </select>
                    </div>
                </td>
                <td>
                    <div className="input-field schedule">
                        <select className="browser-default schedule" name="Tuesday" value={this.state.Tuesday} onChange={e => this.handleUserChange(e)}>
                            <option value=""></option>
                            <option value="OFF">OFF</option>
                            <option value="8am-5pm">8am-5pm</option>
                            <option value="9am-6pm">9am-6pm</option>
                            <option value="10am-7pm">10am-7pm</option>
                            <option value="11am-8pm">11am-8pm</option>
                            <option value="12pm-9pm">12pm-9pm</option>
                            <option value="1pm-10pm">1pm-10pm</option>
                            <option value="2pm-11pm">2pm-11pm</option>
                            <option value="3pm-12am">3pm-12am</option>
                        </select>
                    </div>
                </td>
                <td>
                    <div className="input-field schedule">
                        <select className="browser-default schedule" name="Wednesday" value={this.state.Wednesday} onChange={e => this.handleUserChange(e)}>
                            <option value=""></option>
                            <option value="OFF">OFF</option>
                            <option value="8am-5pm">8am-5pm</option>
                            <option value="9am-6pm">9am-6pm</option>
                            <option value="10am-7pm">10am-7pm</option>
                            <option value="11am-8pm">11am-8pm</option>
                            <option value="12pm-9pm">12pm-9pm</option>
                            <option value="1pm-10pm">1pm-10pm</option>
                            <option value="2pm-11pm">2pm-11pm</option>
                            <option value="3pm-12am">3pm-12am</option>
                        </select>
                    </div>
                </td>
                <td>
                    <div className="input-field schedule">
                        <select className="browser-default schedule" name="Thursday" value={this.state.Thursday} onChange={e => this.handleUserChange(e)}>
                            <option value=""></option>
                            <option value="OFF">OFF</option>
                            <option value="8am-5pm">8am-5pm</option>
                            <option value="9am-6pm">9am-6pm</option>
                            <option value="10am-7pm">10am-7pm</option>
                            <option value="11am-8pm">11am-8pm</option>
                            <option value="12pm-9pm">12pm-9pm</option>
                            <option value="1pm-10pm">1pm-10pm</option>
                            <option value="2pm-11pm">2pm-11pm</option>
                            <option value="3pm-12am">3pm-12am</option>
                        </select>
                    </div>
                </td>
                <td>
                    <div className="input-field schedule">
                        <select className="browser-default schedule" name="Friday" value={this.state.Friday} onChange={e => this.handleUserChange(e)}>
                            <option value=""></option>
                            <option value="OFF">OFF</option>
                            <option value="8am-5pm">8am-5pm</option>
                            <option value="9am-6pm">9am-6pm</option>
                            <option value="10am-7pm">10am-7pm</option>
                            <option value="11am-8pm">11am-8pm</option>
                            <option value="12pm-9pm">12pm-9pm</option>
                            <option value="1pm-10pm">1pm-10pm</option>
                            <option value="2pm-11pm">2pm-11pm</option>
                            <option value="3pm-12am">3pm-12am</option>
                        </select>
                    </div>
                </td>
                <td>
                    <div className="input-field schedule">
                        <select className="browser-default schedule" name="Saturday" value={this.state.Saturday} onChange={e => this.handleUserChange(e)}>
                            <option value=""></option>
                            <option value="OFF">OFF</option>
                            <option value="8am-5pm">8am-5pm</option>
                            <option value="9am-6pm">9am-6pm</option>
                            <option value="10am-7pm">10am-7pm</option>
                            <option value="11am-8pm">11am-8pm</option>
                            <option value="12pm-9pm">12pm-9pm</option>
                            <option value="1pm-10pm">1pm-10pm</option>
                            <option value="2pm-11pm">2pm-11pm</option>
                            <option value="3pm-12am">3pm-12am</option>
                        </select>
                    </div>
                </td>
                <td>
                    <div className="input-field schedule">
                        <select className="browser-default schedule" name="Sunday" value={this.state.Sunday} onChange={e => this.handleUserChange(e)}>
                            <option value=""></option>
                            <option value="OFF">OFF</option>
                            <option value="8am-5pm">8am-5pm</option>
                            <option value="9am-6pm">9am-6pm</option>
                            <option value="10am-7pm">10am-7pm</option>
                            <option value="11am-8pm">11am-8pm</option>
                            <option value="12pm-9pm">12pm-9pm</option>
                            <option value="1pm-10pm">1pm-10pm</option>
                            <option value="2pm-11pm">2pm-11pm</option>
                            <option value="3pm-12am">3pm-12am</option>
                        </select>
                    </div>
                </td>
                <td>
                    <a onClick={this.handleScheduleSave} className="button4">Add</a>
                    {/* <button id={i} onClick={this.handleClearEmpSchedule.bind(this, i)} className="dark_button">Clear</button> */}
                </td>
            </tr>
        )
    }
}

export default EditScheduleRow