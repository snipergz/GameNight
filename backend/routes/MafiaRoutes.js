const express = require('express')
const router = express.Router()
const { getServer, createServer, deleteServer } = require('../controllers/MafiaController')

// Mafia Game Server Routes
router.route('/mafia/:ServerID').get(getServer).delete(deleteServer)

router.post('/mafia', createServer)

module.exports = router