const { successHandler, errorHandler } = require('../helper/responseHandler')
const constants = require('../constant/user')
const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
    try {
        let token = req.headers.authorization
        let result = await jwt.verify(token, process.env.SECRETKEY)
        successHandler(res, constants.SUCCESS_VERIFY_MSG, result)
        next()
    } catch (error) {
        console.log(error)
        return res.status(404).json({ message: 'Invalid token' })
    }
}

module.exports = { verifyToken }