const express = require('express')
const router = express.Router()


const friendsRequestController = require('../controller/friendRequest')


router.post('/userResquest', friendsRequestController.request)

module.exports = router