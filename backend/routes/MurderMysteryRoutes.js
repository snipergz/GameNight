const express = require('express')
const router = express.Router()
const {getServer, createServer, deleteServer, getPlayer, createPlayer, deletePlayer, updatePlayer} = require('../controllers/MurderMysteryController')

//MurderMystery Game Server Routes
router.route('/murderMystery/:serverCode').get(getServer).delete(deleteServer)

router.post('/murderMystery', createServer)

//MurderMystery Game Player Routes
router.route('/murderMystery/player/:serverCode/:playerID').get(getPlayer).put(deletePlayer).patch(updatePlayer)

router.post('/murderMystery/player/:serverCode', createPlayer)

module.exports = router