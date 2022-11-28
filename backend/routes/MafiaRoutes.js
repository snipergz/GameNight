const express = require('express')
const router = express.Router()
const { getServer, createServer, deleteServer, updateServer, getPlayer, createPlayer, deletePlayer, updatePlayer } = require('../controllers/MafiaController')

// Mafia Game Server Routes
router.route('/mafia/:serverCode').get(getServer).delete(deleteServer).patch(updateServer)

router.post('/mafia', createServer)

// Mafia Game Player Routes
router.route('/mafia/player/:serverCode/:playerID').get(getPlayer).put(deletePlayer).patch(updatePlayer)

router.post('/mafia/player/:serverCode', createPlayer)

module.exports = router