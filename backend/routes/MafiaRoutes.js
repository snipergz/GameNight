const express = require('express')
const router = express.Router()
const { getServer, createServer, deleteServer } = require('../controllers/MafiaController')

// Mafia Game Server Routes
router.route('/mafia/:serverID').get(getServer).delete(deleteServer)

router.post('/mafia', createServer)

// Mafia Game Player Routes

module.exports = router