const express = require('express')
const router = express.Router()
const {getServer, createServer, deleteServer,updateServer, getPlayer, createPlayer, deletePlayer, updatePlayer, testinitdata, testnextdata} = require('../controllers/MurderMysteryController')

//MurderMystery Game Server Routes
router.route('/murderMystery/:serverCode').get(getServer).delete(deleteServer).put(updateServer)

router.post('/murderMystery', createServer)

//MurderMystery Game Player Routes
router.route('/murderMystery/player/:serverCode/:playerID').get(getPlayer).delete(deletePlayer).put(updatePlayer)

router.post('/murderMystery/player/:serverCode', createPlayer)

//MP temp test Routes
router.route('/data').get(testinitdata)
router.post('/next', testnextdata)

module.exports = router