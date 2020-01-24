const express = require('express')
const router = express.Router()
const User = require('../models/User')
const uuid = require('uuid/v1');
const asyncHandler = require('../middleware/async')
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')
const config = require('config')

router.post('/register', asyncHandler(async (req, res) => {
    const { password, username } = req.body;
    if (!password || !username) return res.status(400).send("Missing password or username")
    let user = await User.findOne({ username });
    if (user) return res.send("Registration complete"); //Preventing username guessing.
    const id = uuid()
    user = new User({ username, id })
    const hash = await hashPassword(password)
    user.password = hash
    const result = await user.save()
    res.send(JSON.stringify(`Welcome ${result.username}. You can now log in`))
}))

router.post('/login', asyncHandler(async (req, res) => {
    const { password, username } = req.body

    const user = await User.findOne({ username })
    if (!user) return res.status(401).send("Username or pasword incorrect")
    if (! await bcrypt.compare(password, user.password)) {
        return res.status(401).send("Username or password incorrect")
    }
    const token = jwt.sign({ username: user.username, id: user.id }, config.get("jwt.secret"))
    res.send({ token })
}))

router.get('/', auth, (req, res) => {
    res.send({ isLoggedIn: !!req.user, user: req.user.username })
})

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash;
}

module.exports = router;