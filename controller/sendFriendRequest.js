const FriendRequest = require('../models/friendsRequest')
const jwt = require('jsonwebtoken')



const verifyToken = async (req, res, next) => {
    try {
        let token = req.headers.authorization
        let result = await jwt.verify(token, process.env.SECRETKEY)
        successHandler(res, constants.SUCCESS_VERIFY_MSG, result)
        next()
    } catch (error) {
        console.log(error)
        return res.status(404).json({ message: 'Invalid token' })
    }
}

const sendFriendRequest = async (req, res) => {
    try {
        console.log(req.body)
        const result = await new FriendRequest(req.body)
        console.log(result)
        res.status(200).json({ message: 'Friend request sent successfully', result })
    } catch (error) {
        return res.status(500).json({ message: 'something went wrong' })
    }
}

module.exports = { verifyToken, sendFriendRequest }