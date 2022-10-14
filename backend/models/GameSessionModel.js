const mongoose = require("mongoose")

const GameSessionSchema = mongoose.Schema({
    ServerID: {
        type: String,
        required: [true, 'You must have access to a server'],
    },
    ServerCode: {
        type: String,
        required: [true, 'You must have a server code to use the server'],
    },
    Status: {
        type: Boolean,
        required: [true],
    },
})

module.exports = mongoose.model('GameSession', GameSessionSchema)