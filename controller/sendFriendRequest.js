const FriendRequest = require('../models/friendsRequest')
const { successHandler, errorHandler } = require('./../helper/responseHandler')
const constants = require('./../constant/allConstants')



const requestSend = async (req, res) => {
    try {
        console.log(req.body)
        const result = await new FriendRequest({
            requestTo: req.body.requestTo
        })
        await result.save()
        successHandler(res, constants.SUCCESS_SENT_FRIEND_REQ, result)
    } catch (error) {
        return errorHandler(res, error)
    }
}

const requestedList = async (req, res) => {
    try {
        const id = req.params.id
        const result = await FriendRequest.findOne({ _id: id })
        console.log('result--', result)
        successHandler(res, constants.FOUND_ALL_FRIEND_REQ_LIST, result)
    } catch (error) {
        return errorHandler(res, error)
    }
}

module.exports = { requestSend, requestedList }