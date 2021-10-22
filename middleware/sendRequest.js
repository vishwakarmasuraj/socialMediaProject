const { body } = require('express-validator')


const sendRequestValidationRule = () => {
    return [
        body('requestTo').notEmpty()
    ]
}

module.exports = { sendRequestValidationRule }