const express = require('express')
const router = express.Router()

const chatValidationRule = require('../middleware/friendChat')
const chatValidation = require('../middleware/valid')
const authToken = require('../middleware/authToken')
const chatController = require('../controller/friendChat')

router.post('/chat-together', chatValidationRule.friendChatValidationRule(), chatValidation.validate, authToken.verifyToken, chatController.userChatAndSendFile)

router.get('/see-message/:id', authToken.verifyToken, chatController.seeMessageFromChat)

module.exports = router