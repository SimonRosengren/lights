const express = require('express')
const router = express.Router()
const asyncHandler = require('../middleware/async')
const auth = require('../middleware/auth')

router.post('/switch', auth, asyncHandler( async (req, res) => {
    res.send("Lights are on")
}))

module.exports = router;