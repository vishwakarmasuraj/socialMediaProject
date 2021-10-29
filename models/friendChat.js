const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FriendChat = new Schema({
    fromUserId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    message: {
        type: String,
        enum: ['txt', 'jpg', 'mp3']
    },
    url: {
        type: String,
    }
}, { timestamps: true })

module.exports = mongoose.model('FriendChat', FriendChat)