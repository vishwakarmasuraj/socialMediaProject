const express = require('express')
const router = express.Router()


const chatValidationRule = require('../middleware/friendChat')
const chatValidation = require('../middleware/valid')
const authToken = require('../middleware/authToken')
const chatController = require('../controller/friendChat')


router.post('/chatTogether', chatValidationRule.friendChatValidationRule(), chatValidation.validate, authToken.verifyToken, chatController.userChatAndSendFile)

module.exports = router