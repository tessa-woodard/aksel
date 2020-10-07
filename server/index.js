require("dotenv").config()

const socket = require('socket.io')

const path = require('path')

const express = require('express')
const massive = require('massive')
const session = require('express-session')

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

const authCtrl = require('./authController')
const postCtrl = require('./postController')
const commentCtrl = require('./commentController')

const scheduleCtrl = require('./scheduleController')

const verifyUser = require('./middlewares/verifyUser')

const app = require('express')()

const server = app.listen(SERVER_PORT, () =>
    console.log(`Listening on port ${SERVER_PORT}`)
)

const io = socket(server)

io.on('connection', socket => {
    console.log('connected')
    socket.on('message', ({ name, message }) => {
        io.emit('message', { name, message })
    })
})


app.use(express.json())

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365
    }
}))

app.use(express.static(__dirname + '/../build'))

app.post("/register", authCtrl.register)
app.post("/login", authCtrl.login)
app.delete("/logout", authCtrl.logout)

app.get('/auth/user', authCtrl.getUser)

app.get('/posts', verifyUser, postCtrl.getPosts)
app.post('/posts', verifyUser, postCtrl.addPost)
app.put('/posts/:post_id', verifyUser, postCtrl.editPost)
app.delete('/posts/:post_id', verifyUser, postCtrl.deletePost)

app.get('/comments', verifyUser, commentCtrl.getComments)
app.post('/comments', verifyUser, commentCtrl.addComment)
app.put('/comments/:comment_id', verifyUser, commentCtrl.editComment)
app.delete('/comments/:comment_id', verifyUser, commentCtrl.deleteComment)

app.get('/schedule', verifyUser, scheduleCtrl.getShifts)
app.post('/schedule/:shift_id', verifyUser, scheduleCtrl.addShift)
app.put('/schedule/:employee_id', verifyUser, scheduleCtrl.editShift)
app.delete('/schedule/:shift_id', verifyUser, scheduleCtrl.deleteShift)

massive({
    connectionString:
        CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
}).then(dbInstance => {
    app.set('db', dbInstance)
    console.log('DB working')
}).catch(err => console.log(err))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
})