const express = require('express')
const router = express.Router()


const friendsRequestController = require('../controller/friendRequest')


router.post('/userResquest', friendsRequestController.requestForUser)

module.exports = router