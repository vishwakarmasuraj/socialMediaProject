const express = require('express')
const router = express.Router()


router.use('/userRecord', require('./user'))

router.use('/send', require('./userSend'))

module.exports = router