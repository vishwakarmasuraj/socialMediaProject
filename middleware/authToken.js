const { successHandler } = require('../helper/responseHandler')
const constants = require('../constant/allConstants')
const jwt = require('jsonwebtoken')
const config = process.env

const verifyToken = async (req, res, next) => {
    try {
        let token = req.headers.authorization
        let result = await jwt.verify(token, config.SECRETKEY)
        successHandler(res, constants.SUCCESS_VERIFY_MSG, result)
        next()
    } catch (error) {
        console.log(error)
        return res.status(404).json({ message: 'Invalid token' })
    }
}

module.exports = { verifyToken }