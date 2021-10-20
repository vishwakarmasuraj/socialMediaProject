const mongoose = require('mongoose')
const Schema = mongoose.Schema

const friendSchema = new Schema({
    requestFrom: { type: SchemaTypes.ObjectId, ref: 'Users' },
    requestTo: { type: SchemaTypes.ObjectId, ref: 'Users' },
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

module.exports = mongoose.model('FriendRequest', friendSchema)