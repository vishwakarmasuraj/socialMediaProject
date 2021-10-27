const FriendRequest = require('../models/friendsRequest')
const { successHandler, errorHandler } = require('./../helper/responseHandler')
const constants = require('./../constant/allConstants')



const requestSend = async (req, res) => {
    try {
        console.log(req.userData)
        const result = await new FriendRequest({ requestFrom: req.userData._id, requestTo: req.body.requestTo })
        await result.save()
        successHandler(res, constants.SUCCESS_SENT_FRIEND_REQ, result)
    } catch (error) {
        return errorHandler(res, error)
    }
}

const requestedList = async (req, res) => {
    try {
        req.userData = { _id: req.params.id }
        const result = await FriendRequest.find({ requestFrom: req.userData._id })
        console.log('req.userData', req.userData)
        res.status(200).json({ msg: 'Found record', result })
    } catch (error) {
        res.status(500).json({ msg: 'something went wrong' })
    }
}

const requestAccept = async (req, res) => {
    try {

    } catch (error) {

    }
}

module.exports = { requestSend, requestedList, requestAccept }