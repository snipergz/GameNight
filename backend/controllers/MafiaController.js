const asyncHandler = require('express-async-handler')

const mod = require('../models/GameSessionModel')
 

// @desc    Get Server with serverCode
// @route   Get /gamenight/server/mafia/:ServerID
// @access  Public
const getServer = asyncHandler(async (req, res) => {

    const initserver = await mod.find({ServerID:req.params.ServerID})
    const server = initserver[0]

    if(!server){
        res.status(400)
        throw new Error('Server not found')
    }

    res.status(200).json(server)
})

// @desc    Create Server 
// @route   Post /gamenight/server/mafia
// @access  Public
const createServer = asyncHandler(async (req, res) => {
    if(!req.body){
        res.status(400)
        throw new Error('was empty')
    }

    const server = await mod.create({
        ServerID: req.body.ServerID,
        ServerCode: req.body.ServerCode,
        Status: req.body.Status
    })

    res.status(200).json(server)
})

// @desc    Delete Server with serverCode
// @route   Delete /gamenight/server/mafia/:ServerID
// @access  Public
const deleteServer = asyncHandler(async (req, res) => {

    const initserver = await mod.find({ServerID:req.params.ServerID})
    const server = initserver[0]

    console.log(server)

    if(!server){
        res.status(400)
        throw new Error('Server not found')
    }

    await server.remove()

    res.status(200).json({message: `Deleted Server with server code: ${req.params.ServerID}` })
})

module.exports = {
    getServer, createServer, deleteServer
} 