const express = require('express')
const router = express.Router()


router.use('/userRecord', require('./user'))

router.use('/requestSend', require('./sendRequest'))

module.exports = router