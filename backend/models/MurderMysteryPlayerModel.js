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

<<<<<<< HEAD
module.exports = mongoose.model('MurderMysteryGamePlayer', MurderMysteryPlayerSchema)
=======
module.exports = mongoose.model('MysteryPlayer', MurderMysteryPlayerSchema)
>>>>>>> bb7f1ce2fe59e9ada6fb7cb7cdc56ecd0f5cd130
