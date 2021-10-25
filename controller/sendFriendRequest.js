const FriendRequest = require('../models/friendsRequest')
const { successHandler, errorHandler } = require('./../helper/responseHandler')
const constants = require('./../constant/allConstants')



const requestSend = async (req, res) => {
    try {
        console.log(req.userData)
        const result = await new FriendRequest(req.body)
        await result.save()
        successHandler(res, constants.SUCCESS_SENT_FRIEND_REQ, result)
    } catch (error) {
        return errorHandler(res, error)
    }
}

const requestedList = async (req, res) => {
    try {
        const result = await FriendRequest.find({}).populate({ path: 'Users' })
        successHandler(res, constants.FOUND_ALL_FRIEND_REQ_LIST, result)
    } catch (error) {
        return errorHandler(res, error)
    }
}

module.exports = { requestSend, requestedList }