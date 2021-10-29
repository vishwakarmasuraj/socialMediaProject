const FriendRequest = require('../models/friendsRequest')
const { successHandler, errorHandler } = require('./../helper/responseHandler')
const constants = require('./../constant/allConstants')


const userChatAndSendFile = async (req, res) => {
    try {
        const result = await new FriendRequest({
            fromUserId: req.params.fromUserId,
            toUserId: req.body.toUserId,
            message: req.body.message,
            url: req.body.url
        })
        await result.save()
        res.status(200).json({ message: 'Chating start' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'something went wrong' })
    }
}

module.exports = { userChatAndSendFile }