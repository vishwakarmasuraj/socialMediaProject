const { body } = require('express-validator')

const requestRule = () => {
    return [
        // body('requestFrom').notEmpty(),
        // body('requestTo').notEmpty(),
        body('status').notEmpty(),
        body('message')
    ]
}

module.exports = { requestRule }