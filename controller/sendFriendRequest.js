const FriendRequest = require('../models/friendsRequest')
const { successHandler, errorHandler } = require('./../helper/responseHandler')
const constants = require('./../constant/user')
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

const sendFriendRequest = async (req, res) => {
    try {
        console.log(req.body)
        const result = await new FriendRequest(req.body)
        await result.save()
        successHandler(res, constants.SUCCESS_SENT_FRIEND_REQ, result)
    } catch (error) {
        errorHandler(res, constants.INVALID_REQ_ID)
    }
}

const friendRequestListing = async (req, res) => {
    try {
        const result = await FriendRequest.find({})
        console.log(result)
        successHandler(res, constants.FOUND_ALL_FRIEND_REQ_LIST, result)
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports = { verifyToken, sendFriendRequest, friendRequestListing }