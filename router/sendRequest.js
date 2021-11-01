const express = require('express')
const router = express.Router()


const reqValidationRule = require('../middleware/requestRule')
const reqValidation = require('../middleware/valid')
const authToken = require('../middleware/authToken')
const sendReqController = require('../controller/sendFriendRequest')

router.post('/send-req', reqValidationRule.requestRule(), reqValidation.validate, authToken.verifyToken, sendReqController.requestSend)

router.get('/request-list/:id', authToken.verifyToken, sendReqController.requestedList)

router.put('/update-status/:id', reqValidationRule.requestRule(), reqValidation.validate, authToken.verifyToken, sendReqController.knowStatus)

router.get('/my-friend-list', authToken.verifyToken, sendReqController.seeMyFriendList)

router.delete('/unfriend/:id', authToken.verifyToken, sendReqController.userCanUnFriend)

module.exports = router