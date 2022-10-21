const asyncHandler = require('express-async-handler')

const gameServer = require('../models/MafiaServerModel')
const mafiaPlayer = require('../models/MafiaPlayerModel')

// General Functions
function generateServerCode(){
    // Generate a random UUID
    // Trim it down to 6 digits maybe use modulus
    // return code that will be used in createServer
    return Math.floor(Math.random() * 1010000);
}

// Mafia Player CRUD METHODS

// @desc    Get Player with playerID and serverID
// @route   Get /gamenight/server/mafia/player/:serverID/:playerID
// @access  Public
const getPlayer = asyncHandler(async (req, res) => {
    try{
        console.log(`Finding player with PlayerID: ${req.params.playerID}...`)
        const server = await gameServer.findOne({serverID:req.params.serverID}) 
        const player = server.players.find(plr => plr.playerID === req.params.playerID)
        res.status(200).json(player)
        console.log(player)
    }
    catch ( error ){
        console.log(error)
        res.status(400)
        throw new Error('Player not found')
    }
})

// @desc    Create Player, intialize with a 'civilian' role and when the game starts, assign roles
// @route   Post /gamenight/server/mafia/player/:serverID
// @access  Public
const createPlayer = asyncHandler(async (req, res) => {
    try{
        console.log(`Creating Player for Server: ${req.body}...`)

        const player = await mafiaPlayer.create({
            serverID: req.params.serverID,
            playerID: process.env.playerID,
            role: 'civilian',
            name: process.env.name,
            status: true,
            isAlive: false,
        })
        res.status(200).json(player)
        console.log(player)
    }
    catch ( error ){
        console.log(error)
        res.status(400)
        throw new Error('Player cannot be created')
    }
})

// @desc    Delete Player
// @route   Update /gamenight/server/mafia/player/:serverID/:playerID
// @access  Public
const deletePlayer = asyncHandler(async (req, res) => {
    try {
        //const player = await gameServer.findOne({playerID:req.params.serverID.players.playerID})
        const server = await gameServer.findOne({serverID:req.params.serverID})
        const players = server.players.filter(plr => plr.playerID != req.params.playerID)
        console.log(players)
       // const fling = server.updateOne({serverID: req.params.serverID}, {players:players})
        server.update(req.params.serverID, players)//this line
        res.status(200).json({message: `Deleted Player with PlayerID: ${req.params.playerID}` })
        console.log(server)
        console.log(fling)
    } catch (error) {
        res.status(400)
        throw new Error('Player not found')
    }
})

// Game Server CRUD METHODS

// @desc    Get Server with serverCode
// @route   Get /gamenight/server/mafia/:serverID
// @access  Public
const getServer = asyncHandler(async (req, res) => {
    try {
        console.log(`Finding Server with ServerID: ${req.params.ServerID}...`)
        //for the this to actaull work proper
        //const server = await gameServer.findOne({serverID:req.params.ServerID})
        //return all the players
        //const server = await mafiaPlayer.find()
        //return all the gameServers
        const server = await gameServer.find()
        console.log(server)
        res.status(200).json(server)
    } catch (error) {
        console.log(error)
        res.status(400)
        throw new Error('Server not found')
    }
})

// @desc    Create Server 
// @route   Post /gamenight/server/mafia
// @access  Public
const createServer = asyncHandler(async (req, res) => {
    try {
        console.log(`Creating Game Server for the game: ${req.body.game}...`)
        const server = await gameServer.create({
            serverCode: generateServerCode(),
            players: [],
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

// @desc    Update Players into Server with serverCode
// @route   Update /gamenight/server/mafia/:serverID
// @access  Public
const addPlayersToServer = asyncHandler(async (req, res) => {
    try {
        const players = await mafiaPlayer.find({serverID:req.params.serverID})
        const server = await gameServer.findOneAndUpdate({serverID:req.params.serverID}, {players:players})
        console.log(server)
        res.status(200).json({message: `Updated Server with players: ${players}` })
    } catch (error) {
        res.status(400)
        throw new Error('Server not found')
    }
})

// @desc    Delete Server with serverCode
// @route   Delete /gamenight/server/mafia/:serverID
// @access  Public
const deleteServer = asyncHandler(async (req, res) => {
    try {
        const server = await gameServer.findOne({serverID:req.params.serverID})
        console.log(server)
        await server.remove()
        res.status(200).json({message: `Deleted Server with server code: ${req.params.serverID}` })
    } catch (error) {
        res.status(400)
        throw new Error('Server not found')
    }
})

module.exports = {
    getServer, createServer, addPlayersToServer, deleteServer, getPlayer, createPlayer, deletePlayer
} 