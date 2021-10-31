const express = require('express')
const router = express.Router()


const reqValidationRule = require('../middleware/requestRule')
const reqValidation = require('../middleware/valid')
const authToken = require('../middleware/authToken')
const sendReqController = require('../controller/sendFriendRequest')

router.post('/sendReq', reqValidationRule.requestRule(), reqValidation.validate, authToken.verifyToken, sendReqController.requestSend)

router.get('/requestList/:_id', authToken.verifyToken, sendReqController.requestedList)

router.put('/updateStatus/:_id', reqValidationRule.requestRule(), reqValidation.validate, authToken.verifyToken, sendReqController.knowStatus)

router.get('/myFriendList', sendReqController.seeMyFriendList)

router.delete('/unfriend/:_id', authToken.verifyToken, sendReqController.userCanUnFriend)

module.exports = router