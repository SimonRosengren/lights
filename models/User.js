const mongoose = require('mongoose')

const schema = mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
})
const User = mongoose.model('User', schema);
module.exports = User;