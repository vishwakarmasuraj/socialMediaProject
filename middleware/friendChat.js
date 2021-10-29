const { body } = require('express-validator')

const friendChatValidationRule = () => {
    return [
        body('fromUserId').notEmpty(),
        body('toUserId').notEmpty(),
        body('message').notEmpty(),
        body('messageType').notEmpty(),
        body('url').optional()
    ]
}

module.exports = { friendChatValidationRule }