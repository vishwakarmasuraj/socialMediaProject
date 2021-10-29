const FriendChat = require('../models/friendChat')
const multer = require('multer')
const constants = require('../constant/allConstants')

const userChatAndSendFile = async (req, res) => {
    try {
        console.log(req.userData)
        const result = await new FriendChat({
            fromUserId: req.userData._id,
            toUserId: req.body.toUserId,
            message: req.body.message,
            url: req.body.url
        })
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                if (
                    file.mimetype == 'txt' ||
                    file.mimetype == 'FLAC' ||
                    file.mimetype == 'MP3' ||
                    file.mimetype == ' WAV' ||
                    file.mimetype == 'MP4' ||
                    file.mimetype == 'WMA' ||
                    file.mimetype ||
                    'AAC'
                ) {
                    cb(null, true)
                } else {
                    cb(null, false)
                    return cb(new Error(constants.AUDIO_FORMAT_ERR))
                }
                cb(null, __dirname + './../uploads')
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname)
            },
        })

        const upload = multer({
            storage: storage,
            onFileUploadStart: function (file) {
                console.log(file.originalname + ' is starting ...')
            },
        })
        await result.save()
        res.status(200).json({ message: 'Chating start', result })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'something went wrong' })
    }
}

module.exports = { userChatAndSendFile }