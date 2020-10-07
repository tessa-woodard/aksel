import React from 'react'

class Shift extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            empSchedules: [],
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col s12">
                        <div className="section schedule">
                            <h5>Weekly Schedule</h5>
                            <table className="bordered">
                                <thead>
                                    <tr>
                                        <th data-field="name">Name</th>
                                        <th data-field="name">&#160;&#160;Mon</th>
                                        <th data-field="name">Tues</th>
                                        <th data-field="name">&#160;&#160;Wed</th>
                                        <th data-field="name">&#160;Thurs</th>
                                        <th data-field="name">&#160;&#160;Fri</th>
                                        <th data-field="name">&#160;Sat</th>
                                        <th data-field="name">Sun</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.empSchedules.map((employee) => {
                                        return (
                                            <tr>
                                                <td className="fullName">
                                                    {employee.first_name} {employee.last_name}
                                                </td>
                                                <td className="schedule">
                                                    {employee.schedule.Monday}
                                                </td>
                                                <td>
                                                    {employee.schedule.Tuesday}
                                                </td>
                                                <td>
                                                    {employee.schedule.Wednesday}
                                                </td>
                                                <td>
                                                    {employee.schedule.Thursday}
                                                </td>
                                                <td>
                                                    {employee.schedule.Friday}
                                                </td>
                                                <td>
                                                    {employee.schedule.Saturday}
                                                </td>
                                                <td>
                                                    {employee.schedule.Sunday}
                                                </td>
                                            </tr>
                                        )
                                    }, this)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Shift