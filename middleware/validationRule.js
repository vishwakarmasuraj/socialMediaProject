const { body } = require('express-validator')
const User = require('../models/user')


const validationRule = () => {
    return [
        body('title').notEmpty(),
        body('firstName').notEmpty().isLength({ max: 100 })
            .custom(value => {
                return User.findOne({ firstName: value }).then(data => {
                    if (data) {
                        return Promise.reject('FirstName is already exist')
                    }
                })
            }),
        body('lastName').notEmpty().isLength({ max: 100 }),
        body('email').isEmail()
            .custom(value => {
                return User.findOne({ email: value }).then(data => {
                    if (data) {
                        return Promise.reject('email is already exist')
                    }
                })
            }),
        body('password').notEmpty().isLength({ min: 6 }).withMessage('Invalid password'),
        body('interest').notEmpty(),
        body('hobbies').notEmpty(),
        body('status').notEmpty()
    ]
}

module.exports = { validationRule }