const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FriendRequest = new Schema({
    requestFrom: {
        type: Schema.Types.ObjectId, ref: 'userSchema'
    },
    requestTo: {
        type: Schema.Types.ObjectId, ref: 'userSchema'
    },
    status: {
        type: String,
        required: true,
        enum: ['Open', 'Close', 'Decline', 'Accept'],
        default: 'Open'
    },
    message: {
        type: String
    }

}, { timestamps: true })

module.exports = mongoose.model('FriendRequest', FriendRequest)