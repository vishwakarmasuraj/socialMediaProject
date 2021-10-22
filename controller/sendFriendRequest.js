const { successHandler, errorHandler } = require('./../helper/responseHandler')
const constants = require('./../constant/allConstants')
const FriendRequest = require('../models/friendsRequest')


const requestSend = async (req, res) => {
    try {
        console.log(req.body)
        const result = await new FriendRequest(req.body)
        await result.save()
        successHandler(res, constants.SUCCESS_SENT_FRIEND_REQ)
    } catch (error) {
        return errorHandler(res, error)
    }
}

module.exports = { requestSend }