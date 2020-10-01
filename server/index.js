require("dotenv").config()

const express = require('express')
const massive = require('massive')
const session = require('express-session')

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

const authCtrl = require('./authController')
const postCtrl = require('./postController')
const commentCtrl = require('./commentController')

const verifyUser = require('./middlewares/verifyUser')

const app = express()

app.use(express.json())

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365
    }
}))

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
app.delete('/comment/:comment_id', verifyUser, commentCtrl.deleteComment)

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