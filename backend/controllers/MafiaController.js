const asyncHandler = require('express-async-handler')

const gameServer = require('../models/GameServerModel')

function generateServerCode(){
    // Generate a random UUID
    // Trim it down to 6 digits maybe use modulus
    // return code that will be used in createServer
    return 1234
}

// @desc    Get Server with serverCode
// @route   Get /gamenight/server/mafia/:serverID
// @access  Public
const getServer = asyncHandler(async (req, res) => {
    try {
        console.log(`Finding Server with ServerID: ${req.params.ServerID}...`)
        const server = await gameServer.findOne({serverID:req.params.ServerID})
        console.log(server)
        res.status(200).json(server)
    } catch (error) {
        console.log(error)
        res.status(400)
        throw new Error('Server not found')
    }
})

// @desc    Create Server 
// @route   Post /gamenight/mafia
// @access  Public
const createServer = asyncHandler(async (req, res) => {
    try {
        console.log(`Creating Game Server for the game: ${req.body.game}...`)
        const server = await gameServer.create({
            game: req.body.game,
            serverCode: generateServerCode(),
            status: true
        })
        res.status(200).json(server)
        console.log(`Successfully Created a Game Server for the game: ${req.body.game}`)
    } catch (error) {
        console.log(error)
        res.status(400)
        throw new Error('Incorrect Request Body')
    }
})

// @desc    Delete Server with serverCode
// @route   Delete /gamenight/server/mafia/:serverID
// @access  Public
const deleteServer = asyncHandler(async (req, res) => {
    try {
        const server = await gameServer.findOne({serverID:req.params.ServerID})
        console.log(server)
        res.status(200).json({message: `Deleted Server with server code: ${req.params.serverID}` })
    } catch (error) {
        res.status(400)
        throw new Error('Server not found')
    }
})

module.exports = {
    getServer, createServer, deleteServer
} 