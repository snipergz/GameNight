const asynchHandler = require('express-async-handler')

const mod = require('../models/modModel')

// @desc    Get Server with serverCode
// @route   Get /gamenight/server/mafia/:id
// @access  Public
const getServer = asyncHandler(async (req, res) => {
    const server = await mod.find()
    res.status(200).json(server)
})

// @desc    Create Server 
// @route   Post /gamenight/server/mafia
// @access  Public
const createServer = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('was empty')
    }

    const server = await mod.create({
        text: req.body.text
    })

    res.status(200).json(server)
})

// @desc    Delete Server with serverCode
// @route   Delete /gamenight/server/mafia/:id
// @access  Public
const deleteServer = asyncHandler(async (req, res) => {

    const server = await mod.findById(req.params.id);
    await mod.remove()

    res.status(200).json({message: `Deleted Server with server code: ${req.params.id}` })
})

module.exports = {
    getServer, createServer, deleteServer
} 