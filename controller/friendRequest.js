const { successHandler, errorHandler } = require('../helper/responseHandler')
const FriendRequest = require('../models/friendsRequest')


const request = async (req, res) => {
    try {
        const result = await FriendRequest.findByIdAndUpdate({ id: req.params.id })
        res.status(200).json({ msg: 'found', result })
    } catch (error) {
        res.status(500).json({ msg: 'something went wrong' })
    }
}

module.exports = { request }
