const FriendRequest = require('../models/friendsRequest')
const { successHandler, errorHandler } = require('./../helper/responseHandler')
const constants = require('./../constant/allConstants')



const requestSend = async (req, res) => {
    try {
        if (req.userData._id === req.body.requestTo) {
            return res.status(200).json({ msg: 'you can not send friend request yourself' })
        }
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
        console.log(req.params)
        let _id = req.params._id
        const result = await FriendRequest.find({ requestTo: _id }).populate('requestFrom', '-password')
        res.status(200).json({ msg: 'Found record', result })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'something went wrong' })
    }
}

const knowStatus = async (req, res) => {
    try {
        console.log(req.params._id)
        let _id = req.params._id
        const result = await FriendRequest.findByIdAndUpdate
            ({ _id: _id }, { $set: { status: req.body.status, message: req.body.message } })
        res.status(200).json({ msg: 'status updated', result })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'something went wrong' })
    }
}

const userChatAndSendFile = async (req, res, next) => {
    try {
        const option = {
            root: Path.join(__dirname)
        };
        const fileName = hello.txt;
        res.status(200).sendFile(fileName, option, (err) => {
            if (err) {
                next(err)
            } else {
                console.log('Sent', fileName)
            }
        })
    } catch (error) {

    }
}


module.exports = { requestSend, requestedList, knowStatus, userChatAndSendFile }