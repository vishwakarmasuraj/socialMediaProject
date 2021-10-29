const { body } = require('express-validator')

const friendChatValidationRule = () => {
    return [
        body('id').notEmpty(),
        body('fromUserId').notEmpty(),
        body('toUserId').notEmpty(),
        body('message').notEmpty(),
        body('url').notEmpty()
    ]
}

module.exports = { friendChatValidationRule }