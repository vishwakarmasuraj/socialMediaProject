const FriendRequest = require('../models/friendsRequest')
const { successHandler, errorHandler } = require('./../helper/responseHandler')
const constants = require('./../constant/allConstants')



const requestSend = async (req, res) => {
    try {
        console.log(req.body)
        const result = await FriendRequest.create(req.body)
        await result.save()
        successHandler(res, constants.SUCCESS_SENT_FRIEND_REQ, result)
    } catch (error) {
        return errorHandler(res, error)
    }
}

const requestedList = async (req, res) => {
    try {
        const _id = req.params.userId
        const result = await FriendRequest.find({ _id: _id }).populate('Users')
        console.log('result--', result)
        successHandler(res, constants.FOUND_ALL_FRIEND_REQ_LIST, result)
    } catch (error) {
        return errorHandler(res, error)
    }
}

module.exports = { requestSend, requestedList }