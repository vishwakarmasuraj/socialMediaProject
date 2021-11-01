const express = require('express')
const router = express.Router()

router.use('/user-record', require('./user'))

router.use('/request-send', require('./sendRequest'))

router.use('/chat', require('./friendChat'))

module.exports = router