const logger = require('../services/logger')

module.exports = (error, req, res, next) => {
    logger.error(error.message, error)
    res.status(500).send(`ERROR: ${error}`)
}