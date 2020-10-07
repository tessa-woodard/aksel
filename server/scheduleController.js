const getSchedule = async (db) => {
    const shifts = await db.get_shifts()
    const formattedSchedule = shifts.reduce((schedule, shift) => {
        const index = schedule.findIndex((e) => {
            return e.id === shift.id
        })
        if (index === -1) {
            const employee = {
                id: shift.id,
                first_name: shift.first_name,
                last_name: shift.last_name,
                schedule: {
                    [shift.week_day]: shift.shift_time
                }
            }
            schedule.push(employee)
        } else {
            schedule[index].schedule[shift.week_day] = shift.shift_time
        }
        return schedule
    }, [])
    return formattedSchedule
}

module.exports = {
    getShifts: async (req, res) => {
        const db = req.app.get('db')
        const shifts = await getSchedule(db)
        res.status(200).send(shifts)
    },

    addShift: async (req, res) => {
        const db = req.app.get('db')

        const { id } = req.session.user

        const { week_day, shift_time } = req.body

        await db.add_shift([id, week_day, shift_time])

        const shifts = await getSchedule(db)

        res.status(200).send(shifts)
    },

    editShift: async (req, res) => {
        const db = req.app.get('db')

        const { employee_id } = req.params

        const schedule = []
        for (let key in req.body) {
            const shift = {
                users_id: employee_id,
                week_day: key,
                shift_time: req.body[key]
            }
            schedule.push(shift)
        }
        await db.schedule.destroy({ users_id: employee_id })
        await db.schedule.insert(schedule)
        const shifts = await getSchedule(db)
        res.status(200).send(shifts)
    },

    deleteShift: async (req, res) => {
        const db = req.app.get('db')

        const { shift_id } = req.params

        await db.delete_shift([shift_id])

        const shifts = await getSchedule(db)
        res.status(200).send(shifts)
    }
}