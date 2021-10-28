const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        // console.log(token)
        const { data } = await jwt.verify(token, process.env.SECRETKEY)
        console.log(data)
        req.userData = data
        next()
    } catch (error) {
        console.log(error)
        return res.status(404).json({ message: 'Invalid token' })
    }
}

module.exports = { verifyToken }