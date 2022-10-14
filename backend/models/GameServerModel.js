const mongoose = require("mongoose")

const GameServerSchema = mongoose.Schema({
    game: {
        type: String,
        required: [true, 'Please state the game being played']
    },
    serverCode: {
        type: String,
        required: [true, 'You must have a server code to access the server'],
    },
    status: {
        type: Boolean,
        required: [true],
    },
})

module.exports = mongoose.model('GameServer', GameServerSchema)