const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        console.log(token)
        req.userData = await jwt.verify(token, process.env.SECRETKEY)
        next()
    } catch (error) {
        console.log(error)
        return res.status(404).json({ message: 'Invalid token' })
    }
}

module.exports = { verifyToken }