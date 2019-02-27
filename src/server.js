const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server')
const app = express()

// init chatkit
const chatkit = new Chatkit.default({
    instanceLocator: 'v1:us1:3703e0f6-a932-4f38-bafd-ea42fe5446a4',
    key: '5cd12835-7cfc-4350-893c-e6a80d5de41f:0k7pU8AbieEM9Zy6mVGzKQeN+DM+6/HjmVqPq4gM7RQ=',
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// create users
app.post('/users', (req, res) => {
    const { username } = req.body
    console.log(username);
    chatkit
        .createUser({
            id: username,
            name: username
        })
        .then(() => res.sendStatus(201))
        .catch(error => {
            if (error.error_type === 'services/chatkit/user_already_exists') {
                res.sendStatus(200)
            } else {
                res.status(error.status).json(error)
            }
        })
})
const PORT = 3001
app.listen(PORT, err => {
    if (err) {
        console.error(err)
    } else {
        console.log(`Running on port ${PORT}`)
    }
})