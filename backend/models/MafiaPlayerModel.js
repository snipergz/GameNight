const mongoose = require("mongoose")

const MafiaPlayerSchema = mongoose.Schema({
    serverID: {
        type: String,
        required: [true, 'You must have access to a server'],
    },
    slayerID: {
        type: String,
        required: [true, 'You must have a playerID to play'],
    },
    role: {
        type: String,
        required: [true, 'You must have a role assigned to you to play'],
    },
    name: {
        type: String,
        required: [true, 'Please add a text value'],
    },
    status: {
        type: Boolean,
        required: [true],
    },
    isAlive: {
        type: Boolean,
        required: [true],
    },
})

module.exports = mongoose.model('Mafia', MafiaPlayerSchema)