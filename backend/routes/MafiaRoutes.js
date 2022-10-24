const express = require('express')
const router = express.Router()
const { getServer, createServer, deleteServer, getPlayer, createPlayer, deletePlayer } = require('../controllers/MafiaController')

// Mafia Game Server Routes
router.route('/mafia/:serverID').get(getServer).delete(deleteServer)

router.post('/mafia', createServer)

// Mafia Game Player Routes
router.route('/mafia/player/:serverID/:playerID').get(getPlayer).put(deletePlayer)

router.post('/mafia/player/:serverID', createPlayer)

module.exports = router