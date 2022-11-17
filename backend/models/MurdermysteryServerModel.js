const mongoose = require("mongoose")

const GameServerSchema = mongoose.Schema({
    serverCode: {
        type: String,
        required: [true, 'You must have a server code to access the server'],
    },
    players:{
        type: Array
    },
    status: {
        type: Boolean,
        required: [true],
    },
    room: {
        type: String,
        required: [true],
    },
    choiceOne: {
        type: String,
        required: [true],
    },
    choiceTwo: {
        type: String,
        required: [true],
    },
    choiceThree: {
        type: String,
        required: [true],
    },
})

module.exports = mongoose.model('GameServer', GameServerSchema)