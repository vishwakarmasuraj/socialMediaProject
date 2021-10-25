const express = require('express')
const router = express.Router()


const authToken = require('../middleware/authToken')
const sendReqController = require('../controller/sendFriendRequest')


console.log("authToken", authToken)

router.post('/sendReq', authToken.verifyToken, sendReqController.requestSend)


router.get('/requestList', authToken.verifyToken, sendReqController.requestedList)

module.exports = router