const express = require('express')
const router = express.Router()


router.use('/userRecord', require('./user'))

router.use('/sendRequest', require('./sendFriendRequest'))


module.exports = router