require("dotenv").config()

const express = require('express')
const massive = require('massive')
const session = require('express-session')

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

const authCtrl = require('./authController')

const app = express()
app.use(express.json())

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}))

app.post("/register", authCtrl.register)
app.post("/login", authCtrl.login)
app.post("/logout", authCtrl.logout)

massive({
    connectionString:
        CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
}).then(dbInstance => {
    app.set('db', dbInstance)
    console.log('DB working')
    app.listen(SERVER_PORT, () =>
        console.log(`Server listening on port ${SERVER_PORT}`))
}).catch(err => console.log(err))