const mongoose = require('mongoose')
const config = require('config')
const dbPassword = config.get('mongoDb.mongoDbPassword')
const asyncHandler = require('../middleware/async.js')

const dbUsername = "simon"
const cluster = "smarthome"
const dbUri = "cluster0-bj7qt.mongodb.net"

module.exports = asyncHandler( async () => {
    await mongoose.connect(`mongodb+srv://${dbUsername}:${dbPassword}@${dbUri}/${cluster}?retryWrites=true&w=majority`, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    console.log("Connected to DB...")
    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log('Connection to database has been closed.');
            process.exit(0);
        });
    });
})