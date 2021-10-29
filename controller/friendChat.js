const FriendChat = require('../models/friendChat')
const constants = require('../constant/allConstants')

/**
 * 
 * @param {*} req is object that contain whole records of object.
 * @param {*} res  is response object.
 *            userChatAndSendFile function is handling chatting.
 *            seeMessageFromChat function is handling showing chatting information.
 * @returns 
 */

const userChatAndSendFile = async (req, res) => {
    try {
        if (req.userData._id === req.body.toUserId) {
            res.status(200).json({ message: 'you can not send message yourself' })
        }
        const result = await new FriendChat({
            fromUserId: req.userData._id,
            toUserId: req.body.toUserId,
            message: req.body.message,
            messageType: req.body.messageType,
            url: req.body.url
        })
        await result.save()
        res.status(200).json({ message: 'Chating start', result })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'something went wrong' })
    }
}

const seeMessageFromChat = async (req, res) => {
    try {
        const result = await FriendChat.find({ toUserId: _id }).populate('fromUserId', '-password')
        res.status(200).json({ message: 'Found all message', result })
    } catch (error) {
        return res.status(500).json({ message: 'something went wrong' })
    }
}

module.exports = { userChatAndSendFile, seeMessageFromChat }