const express = require('express')
const router = express.Router()


// const authToken = require('../middleware/authToken')
const sendReqController = require('../controller/sendFriendRequest')


router.post('/sendReq', sendReqController.requestSend)

router.get('/requestList', sendReqController.requestedList)

module.exports = router