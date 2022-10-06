const express = require('express')
const router = express.Router()
const { getServer, createServer, deleteServer } = require('../controllers/MafiaController')

// Mafia Game Server Routes
router.route('/mafia/:id').get(getServer).delete(deleteServer)

router.post('/mafia', createServer)

module.exports = router