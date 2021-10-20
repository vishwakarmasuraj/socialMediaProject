const mongoose = require('mongoose')
const Schema = mongoose.Schema

const friend = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    friends: [{
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        status: { type: String, enum: ['Friend'] },
        default: 'Friend'
    }]
}, { timestamps: true })

module.exports = mongoose.model('Friend', friend)