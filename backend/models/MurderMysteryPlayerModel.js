const mongoose = require("mongoose")

const MurderMysteryPlayerSchema = mongoose.Schema({
    serverCode: {
        type: String,
        required: [true, 'You must have access to a server'],
    },
    playerID: {
        type: String,
        required: [true, 'You must have a playerID to play'],
    },
    name: {
        type: String,
        required: [true, 'Please add a text value'],
    },
    vote: {
        type: String,
        required: [true, 'Please vote for a decision'],
    },
    status: {
        type: Boolean,
        required: [true],
    },
})

module.exports = mongoose.model('MurderMysteryGamePlayer', MurderMysteryPlayerSchema)
