const asyncHandler = require('express-async-handler')

const gameServer = require('../models/MurdermysteryServerModel')
const murderMysteryPlayer = require('../models/MurderMysteryPlayerModel');
const { restart } = require('nodemon');

// choice array
const firstchoice = [{o:'the red door', r:'On the otherside, you see that both doors lead to the same room. You wonder why it was designed this way.'}, {o:'the blue door', r:'On the otherside, you see that both doors lead to the same room. You wonder why it was designed this way.'}]

const lastchoice = [{o:'go down the corridor', r:'You make a break for the corridor as the room fills up. It is long and make various turn though you reach the ends to find that there is no exit. It is too late to go back now. The water is too deep to wade or swim through fast enough. You drown.'}, {o:'garbage chute', r:'You enter the garbage chute and try to slide down though you can feel water pouring down just as you make it to the bottom. You see the reverse silhouette of a door as lit by light from the other side. You rush through it to see a dock leading to a small boat. You sprint through the dock, start the boat, and escape the island and mansion.'}]

const cor = [{o:'the first option', r:'the first result'}, {o:'the second option', r:'the second result'}, {o:'the third option', r:'the third result'}]
let updateint = 0

//General Functions
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

function chooseRooms(){
    //Randomly Chooses a room and removes from the pool of room choices
    return Math.floor(Math.random() % 3);
}

//MurderMystery Player CRUD METHODS

// @desc    Get Player with playerID and serverCode
// @route   Get /gamenight/server/murderMystery/player/:serverCode/:playerID
// @access  Public
const getPlayer = asyncHandler(async (req, res) => {
    try{
        console.log(`Finding player with PlayerID: ${req.params.playerID}...`)
        const server = await gameServer.findOne({serverCode:req.params.serverCode})
        console.log(server)
        const player = server.players.find(plr => plr.playerID === req.params.playerID)
        console.log(player)
        res.status(200).json(player)
        console.log(player)
    }
    catch ( error ){
        console.log(error)
        res.status(400)
        throw new Error('Player not found')
    }
})

// @desc    Create Player
// @route   Post /gamenight/server/murderMystery/player/:serverCode
// @access  Public
const createPlayer = asyncHandler(async (req, res) => {
    try{
        console.log(req.params)
        console.log(`\nCreating Player for Server: ${req.params.serverCode}...`)
        const currentServer = await gameServer.findOne({serverCode:req.params.serverCode})
        if (currentServer) {
            console.log("Creating Player...")
            const player = await murderMysteryPlayer.create({
                serverCode: req.params.serverCode,
                playerID: generatePlayerID(),
                name: req.body.name,
                vote: 0,
                status: false,
            })
            const players = currentServer.players.concat(player)
            const server = await gameServer.updateOne({serverCode:req.params.serverCode}, {$set:{players:players}})
            res.status(200).json({message: `Created player successfully`, player: {player}, status: 'OK'})
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
// @route   Update /gamenight/server/murderMystery/player/:serverCode/:playerID
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

// @desc    Update Player
// @route   Update /gamenight/server/murderMystery/player/:serverCode/:playerID
// @access  Public
const updatePlayer = asyncHandler(async (req, res) => {
    try {
        console.log(`Finding player with PlayerID: ${req.params.playerID}...`)
        await gameServer.updateOne({serverCode:req.params.serverCode, "players.playerID":req.params.playerID}, {$set:{"players.$.vote":req.body.vote}})
        console.log(`Updated ${req.params.playerID}'s status to True`)
        res.status(200).json({message: `Updated player with playerID: ${req.params.playerID} vote`})
    } catch (error) {
        res.status(400)
        console.log(error)
        throw new Error('Failed updating player')
    }
})

// Game Server CRUD METHODS

// @desc    Get Server with serverCode
// @route   Get /gamenight/server/murderMystery/:serverCode
// @access  Public
const getServer = asyncHandler(async (req, res) => {
    try {
        console.log(`Finding Server with serverCode: ${req.params.serverCode}...`)
        //for the this to actaull work proper
        //const server = await gameServer.findOne({serverCode:req.params.serverCode})
        //return all the gameServers for TS
        const server = await gameServer.find()
        // console.log(server)
        console.log(cor[0].o)
        console.log(cor[0].r)
        res.status(200).json(server)
    } catch (error) {
        console.log(error)
        res.status(400)
        throw new Error('Server not found')
    }
})

// @desc    Create Server
// @route   Post /gamenight/server/murderMystery
// @access  Public
const createServer = asyncHandler(async (req, res) => {
    try {
        console.log(`Creating Game Server for the game: ${req.body.game}...`)
        const serverCode = generateServerCode()
        const server = await gameServer.create({
            serverCode: serverCode,
            players: [],
            status: true,
            room: 0,
            choiceOne: chooseSafeRoom(),
            choiceTwo: chooseRooms(),
            choiceThree: chooseRooms(),
        })
        console.log("Creating Moderator Player Object...")
        const player = await murderMysteryPlayer.create({
            serverCode: serverCode,
            playerID: generatePlayerID(),
            name: "Moderator",
            vote: 0,
            status: true,
        })
        await gameServer.updateOne({serverCode:serverCode}, {$set:{players:player}})
        const updatedServer = await gameServer.findOne({serverCode:serverCode})
        res.status(200).json(updatedServer)
        console.log(`Successfully Created a Game Server for the game: ${req.body.game}`)
    } catch (error) {
        console.log(error)
        res.status(400)
        throw new Error('Incorrect Request Body')
    }
})

// @desc    Update Server                                                               ////////////////////////////////////////////////HERE//////////////////////////////////////////
// @route   Update /gamenight/server/murderMystery/:serverCode
// @access  Public
const updateServer = asyncHandler(async (req, res) =>{

    try{
        
        if(updateint == 0){
            await gameServer.updateOne({serverCode:req.params.serverCode, "room":"You find yourself in a dimly lit room. You and a few others are all coming to. Before you can speak, everyones gaze is drawn to the glow of the two doors which stand before you all.", "choiceOne":firstchoice[0].o, "choiceTwo":firstchoice[1].o})
        }

        await gameServer.updateOne({serverCode:req.params.serverCode, "room":"", "choiceOne":"one", "choiceTwo":"two", "choiceThree":"three"})
        
        
        res.status(200).json({message: `Updated server with serverCode: ${req.params.serverCode} status to true`})
    } catch(error){
        res.status(400)
        throw new Error('Incorrect Request Body')
    }
})

// @desc    Delete Server with serverCode
// @route   Delete /gamenight/server/murderMystery/:serverCode
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
    getServer, createServer, updateServer, deleteServer, getPlayer, createPlayer, deletePlayer, updatePlayer
} 