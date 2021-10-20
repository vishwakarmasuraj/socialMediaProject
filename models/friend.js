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
    }
}, { timestamps: true })

module.exports = mongoose.model('Friend', friend)