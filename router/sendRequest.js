const express = require('express')
const router = express.Router()


// const authToken = require('../middleware/authToken')
const sendReqController = require('../controller/sendFriendRequest')

router.post('/send', sendReqController.requestSend)



module.exports = router