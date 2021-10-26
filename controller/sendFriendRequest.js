const FriendRequest = require('../models/friendsRequest')
const { successHandler, errorHandler } = require('./../helper/responseHandler')
const constants = require('./../constant/allConstants')



const requestSend = async (req, res) => {
    try {
        console.log(req.userData)
        const result = await new FriendRequest({ requestFrom: req.userData._id, requestTo: req.userData._id })
        await result.save()
        successHandler(res, constants.SUCCESS_SENT_FRIEND_REQ, result)
    } catch (error) {
        return errorHandler(res, error)
    }
}

const requestedList = async (req, res) => {
    try {
        console.log("req.userData._id", req.userData._id)
        const result = await FriendRequest.find({ requestTo: req.userData._id })
        successHandler(res, constants.FOUND_ALL_FRIEND_REQ_LIST, result)
    } catch (error) {
        return errorHandler(res, error)
    }
}

module.exports = { requestSend, requestedList }