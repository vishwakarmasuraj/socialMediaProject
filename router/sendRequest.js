const express = require('express')
const router = express.Router()


const authToken = require('../middleware/authToken')
const sendReqController = require('../controller/sendFriendRequest')


router.post('/sendReq', authToken.verifyToken, sendReqController.requestSend)

router.get('/requestList/:id', authToken.requestedList, sendReqController.requestedList)

module.exports = router