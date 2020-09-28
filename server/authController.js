const bcrypt = require('bcrypt')

module.exports = {
    register: async (req, res) => {
        const db = req.app.get("db")
        const { email, password, first_name, last_name } = req.body

        const [user] = await db.check_user([email])

        if (user) {
            return res.status(409).send("Email is already in use. Please try signing in.")
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const profile_picture = `https://robohash.org/${first_name}`

        const [newUser] = await db.register_user([first_name, last_name, email, hash, profile_picture])

        req.session.user = newUser

        res.status(200).send(req.session.user)
    },

    getUser: (req, res) => {
        if (req.session.user) {
            res.status(200).send(req.session.user)
        } else {
            res.status(404).send('No session found')
        }
    },

    login: async (req, res) => {
        const db = req.app.get("db")

        const { email, password } = req.body

        const [existingUser] = await db.check_user([email])

        if (!existingUser) {
            return res.status(404).send("Oops! Couldn't find your account. Please try again or create an account.")
        }

        const isAuthenticated = bcrypt.compareSync(password, existingUser.password)

        if (!isAuthenticated) {
            return res.status(403).send("Incorrect email or password. Please try again.")
        }

        delete existingUser.hash

        req.session.user = {
            id: existingUser.id,
            email: existingUser.email,
            first_name: existingUser.first_name,
            last_name: existingUser.last_name,
            profile_picture: existingUser.profile_picture
        }

        res.status(200).send(req.session.user)
    },

    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
}