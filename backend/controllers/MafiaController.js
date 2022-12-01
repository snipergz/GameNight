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

function generatePlayerID(){
    // Generate a random playerID
    //CAPS, 0-9
    const characters ='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = ''
    for ( let i = 0; i < 6; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 36));
    }
    return result
}

// Mafia Player CRUD METHODS

// @desc    Get Player with playerID and serverCode
// @route   Get /gamenight/server/mafia/player/:serverCode/:playerID
// @access  Public
const getPlayer = asyncHandler(async (req, res) => {
    try{
        console.log(`Finding player with PlayerID: ${req.params.playerID}...`)
        const server = await gameServer.findOne({serverCode:req.params.serverCode}) 
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
// @route   Post /gamenight/server/mafia/player/:serverCode
// @access  Public
const createPlayer = asyncHandler(async (req, res) => {
    try{
        console.log(req.params)
        console.log(`\nCreating Player for Server: ${req.params.serverCode}...`)
        const currentServer = await gameServer.findOne({serverCode:req.params.serverCode})
        if (currentServer) {
            console.log("Creating Player...")
            if(req.body.name){
                if(req.body.name === "Moderator"){
                    const player = await mafiaPlayer.create({
                        serverCode: req.params.serverCode,
                        playerID: generatePlayerID(),
                        role: 'Moderator',
                        name: req.body.name,
                        status: false,
                        isAlive: true,
                    })
                }
            } else {
                const player = await mafiaPlayer.create({
                    serverCode: req.params.serverCode,
                    playerID: generatePlayerID(),
                    role: 'Civilian',
                    name: req.body.name,
                    status: false,
                    isAlive: true,
                })
            }
            const players = currentServer.players.concat(player)
            const server = await gameServer.updateOne({serverCode:req.params.serverCode}, {$set:{players:players}})
            res.status(200).json({message: `Created player successfully`, player, status: 'OK'})
            console.log(player)
            console.log(`(Backend) Successfully added ${req.body.name} to the Server: ${req.params.serverCode}`)
        } else {
            console.log("Invalid serverCode")
            res.status(400).json({status: 'NONE'})
        }
    }
    catch ( error ){
        console.log(error)
        res.status(400).json({status: 'NONE'})
        throw new Error('Player cannot be created')
    }
})

// @desc    Delete Player
// @route   Update /gamenight/server/mafia/player/:serverCode/:playerID
// @access  Public
const deletePlayer = asyncHandler(async (req, res) => {
    try {
        const plrs = await gameServer.findOne({serverCode:req.params.serverCode})
        const players = plrs.players.filter(plr => plr.playerID != req.params.playerID)
        const server = await gameServer.updateOne({serverCode:req.params.serverCode}, {$set:{players:players}})
        res.status(200).json({message: `Deleted player with playerID: ${req.params.playerID}` })
    } catch (error) {
        res.status(400)
        throw new Error('Player not found')
    }
})

// @desc    Update Player's Status to true or false (ready or not ready), 
// @route   Update /gamenight/server/mafia/player/:serverCode/:playerID
// @access  Public
const updatePlayer = asyncHandler(async (req, res) => {
    try {
        console.log(`Finding player with PlayerID: ${req.params.playerID}...`)
        await gameServer.updateOne({serverCode:req.params.serverCode, "players.playerID":req.params.playerID}, {$set:{"players.$.status":req.body.status}})
        const server = await gameServer.findOne({serverCode:req.params.serverCode})
        const players = server.players.filter(plr => plr.playerID == req.params.playerID)   
        const player = players[0]
        console.log(`Updated ${req.params.playerID}'s status to ${req.body.status}`)
        res.status(200).json({message: `Updated player with playerID: ${req.params.playerID} status to true`, player})
    } catch (error) {
        res.status(400)
        console.log(error)
        throw new Error('Failed updating player')
    }
})

// Game Server CRUD METHODS

// @desc    Get Server with serverCode
// @route   Get /gamenight/server/mafia/:serverCode
// @access  Public
const getServer = asyncHandler(async (req, res) => {
    try {
        console.log(`Finding Server with serverCode: ${req.params.serverCode}...`)
        //for the this to actaull work proper
        const server = await gameServer.findOne({serverCode:req.params.serverCode})
        //return all the gameServers for TS
        //const server = await gameServer.find()
        // console.log(server)
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
        const serverCode = generateServerCode()
        const server = await gameServer.create({
            serverCode: serverCode,
            players: [],
            status: false
        })
        // console.log("Creating Moderator Player Object...")
        // const player = await mafiaPlayer.create({
        //     serverCode: serverCode,
        //     playerID: generatePlayerID(),
        //     role: 'moderator',
        //     name: "Moderator",
        //     status: true,
        //     isAlive: false,
        // })
        // await gameServer.updateOne({serverCode:serverCode}, {$set:{players:player}})
        // const updatedServer = await gameServer.findOne({serverCode:serverCode})
        res.status(200).json(server)
        console.log(`Successfully Created a Game Server for the game: ${req.body.game}`)
    } catch (error) {
        console.log(error)
        res.status(400)
        throw new Error('Incorrect Request Body')
    }
})

// @desc    Update Server 
// @route   Post /gamenight/server/mafia/:serverCode
// @access  Public
const updateServer = asyncHandler(async (req, res) => {
    try {
        console.log(`Finding server with serverCode: ${req.params.serverCode}...`)
        await gameServer.updateOne({serverCode:req.params.serverCode}, {$set:{status:true}})
        const server = await gameServer.findOne({serverCode:req.params.serverCode})
        console.log(`Updated ${req.params.serverCode}'s status to True`)
        res.status(200).json({message: `Updated server with serverCode: ${req.params.serverCode} status to true`, server})
    } catch (error) {
        res.status(400)
        console.log(error)
        throw new Error('Failed updating server')
    }
})

// @desc    Delete Server with serverCode
// @route   Delete /gamenight/server/mafia/:serverCode
// @access  Public
const deleteServer = asyncHandler(async (req, res) => {
    try {
        const server = await gameServer.findOne({serverCode:req.params.serverCode})
        console.log(server)
        await server.remove()
        res.status(200).json({message: `Deleted Server with server code: ${req.params.serverCode}` })
    } catch (error) {
        res.status(400)
        throw new Error('Server not found')
    }
})

module.exports = {
    getServer, createServer, deleteServer, updateServer, getPlayer, createPlayer, deletePlayer, updatePlayer
} 