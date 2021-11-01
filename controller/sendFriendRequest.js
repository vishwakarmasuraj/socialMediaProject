const FriendRequest = require('../models/friendsRequest')
const { successHandler, errorHandler } = require('./../helper/responseHandler')
const constants = require('./../constant/allConstants')

/**
 * 
 * @param {*} req is object that contain all body object.
 * @param {*} res is response object that handle response object.
 * @returns   requestSend is function that sending friend request to another user
 *            requestedList is function that listing of all friend requested to another user.
 *            knowStatus is function that decides that user is Accept, Decline, Open, Close      
 */

const requestSend = async (req, res) => {
    try {
        if (req.userData._id === req.body.requestTo) {
            return res.status(200).json({ msg: 'you can not send friend request yourself' })
        }
        const result = await new FriendRequest({ requestFrom: req.userData._id, requestTo: req.body.requestTo })
        await result.save()
        successHandler(res, constants.SUCCESS_SENT_FRIEND_REQ, result)
    } catch (error) {
        return errorHandler(res, error)
    }
}

const requestedList = async (req, res) => {
    try {
        let _id = req.params._id
        const result = await FriendRequest.find({ requestTo: _id }).populate('requestFrom', '-password')
        successHandler(res, constants.FRIEND_REQ_LIST_SUCCESS, result)
    } catch (error) {
        return errorHandler(res, error)
    }
}

const knowStatus = async (req, res) => {
    try {
        let _id = req.params._id
        const result = await FriendRequest.findByIdAndUpdate
            ({ _id: _id }, { $set: { status: req.body.status, message: req.body.message } })
        successHandler(res, constants.FRD_STATUS_UPDATE_SUCCESS, result)
    } catch (error) {
        return errorHandler(res, error)
    }
}

const userCanUnFriend = async (req, res) => {
    try {
        let _id = req.params._id
        await FriendRequest.findByIdAndRemove({ _id: _id })
        successHandler(res, constants.UNFRIEND_MSG)
    } catch (error) {
        return errorHandler(res, error)
    }
}

const seeMyFriendList = async (req, res) => {
    try {
        let { friend = "" } = req.query
        const result = await FriendRequest.find({
            $or: [
                { $or: [{ status: { $in: [friend] } }] },
            ]
        })
        console.log(result)
        successHandler(res, constants.FRIEND_LIST_FOUND_SUCCESS, result)
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports = { requestSend, requestedList, knowStatus, seeMyFriendList, userCanUnFriend }