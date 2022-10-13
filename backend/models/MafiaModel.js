const mongoose = require("mongoose")

const MafiaSchema = mongoose.Schema({
    ServerID: {
        type: String,
        required: [true, 'You must have access to a server'],
    },
    PlayerID: {
        type: String,
        required: [true, 'You must have a playerID to play'],
    },
    Role: {
        type: String,
        required: [true, 'You must have a role assigned to you to play'],
    },
    Name: {
        type: String,
        required: [true, 'Please add a text value'],
    },
    Status: {
        type: Boolean,
        required: [true],
    },
    isAlive: {
        type: Boolean,
        required: [true],
    },
})

module.exports = mongoose.model('Mafia', MafiaSchema)