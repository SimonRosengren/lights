const jwt = require('jsonwebtoken')
const config = require('config')
const asyncHandler = require('./async')

module.exports = (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) return res.status(401).send('Access denied.')
        const decoded = jwt.verify(token, config.get('jwt.secret'))
        req.user = decoded
        next();
    } catch (error) {
        console.Console.log("m")
    }

}