const asynchHandler = require('express-async-handler')

// @desc    Get Server with serverCode
// @route   Get /gamenight/server/mafia/:id
// @access  Public
const getServer = (req, res) => {
    res.status(200).json({message: `Server Code is: ${req.params.id}`})
}

// @desc    Create Server 
// @route   Post /gamenight/server/mafia
// @access  Public
const createServer = (req, res) => {
    res.status(200).json({message: 'Created Server with server code 123456'})
}

// @desc    Delete Server with serverCode
// @route   Delete /gamenight/server/mafia/:id
// @access  Public
const deleteServer = (req, res) => {
    res.status(200).json({message: `Deleted Server with server code: ${req.params.id}` })
}

module.exports = {
    getServer, createServer, deleteServer
}