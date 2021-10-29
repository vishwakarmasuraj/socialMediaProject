const FriendChat = require('../models/friendChat')
const multer = require('multer')

const userChatAndSendFile = async (req, res) => {
    try {
        console.log(req.userData)
        const result = await new FriendChat({
            fromUserId: req.userData._id,
            toUserId: req.body.toUserId,
            message: req.body.message,
            url: req.body.url
        })
        await result.save()
        res.status(200).json({ message: 'Chating start', result })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'something went wrong' })
    }
}

module.exports = { userChatAndSendFile }