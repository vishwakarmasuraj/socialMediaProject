const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FriendChat = new Schema({
    fromUserId: {
        type: Schema.Types.ObjectId, ref: 'userSchema'
    },
    toUserId: {
        type: Schema.Types.ObjectId, ref: 'userSchema'
    },
    message: {
        type: String,
    },
    messageType: {
        type: String,
        enum: ['txt', 'jpg']
    },
    url: {
        type: String,

    }
}, { timestamps: true })

module.exports = mongoose.model('FriendChat', FriendChat)