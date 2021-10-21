const { successHandler, errorHandler } = require('../helper/responseHandler')
const FriendRequest = require('../models/friendsRequest')


const requestForUser = async (req, res) => {
    try {
        const id = req.params.id
        const result = await FriendRequest.find({ id: id })
        res.status(200).json({ msg: 'found' })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { requestForUser }
