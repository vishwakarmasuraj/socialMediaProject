const User = require('../models/user')
const { successHandler, errorHandler } = require('../helper/responseHandler')
const constants = require('../constant/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */


const addUser = async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, constants.ROUND)
        const user = await new User(req.body)
        await user.save()
        successHandler(res, constants.USER_CREATED_MSG)
    } catch (error) {
        console.error(error)
        errorHandler(res)
    }
}

const userListing = async (req, res) => {
    try {
        const result = await User.find({})
        successHandler(res, constants.GET_LISTING, result)
    } catch (error) {
        console.error(error)
        errorHandler(res)
    }
}

generateToken = (user) => {
    return jwt.sign({ data: user }, process.env.SECRETKEY, {
        expiresIn: '24h',
    })
}

const userLogin = async (req, res) => {
    try {
        let data = await User.findOne({ email: req.body.email })
        if (!data) {
            return errorHandler(res, constants.EMAILLOGIN_ERR)
        } else {
            await bcrypt.compare(req.body.password, data.password, (error, match) => {
                if (error) {
                    return errorHandler(res, constants.ERROR_MSG, error)
                } else if (match) {
                    return successHandler(res, constants.SUCCESSLOGIN, {
                        token: generateToken(data),
                        data,
                    })
                } else {
                    return errorHandler(res, constants.LOGINPASSFAIL)
                }
            })
        }
    } catch (error) {
        console.log(error)
        errorHandler(res)
    }
}

const searchAnotherUserRecord = async (req, res) => {
    try {
        const { search } = req.query || ''
        const result = await User.find({
            $or: [
                { $or: [{ firstName: req.query.firstName }] },
                { $or: [{ lastName: req.query.lastName }] },
                { $or: [{ email: req.query.email }] },
                { $or: [{ hobbies: req.query.hobbies }] },
                { $or: [{ interest: req.query.interest }] },
            ]
        })
        res.status(200).json({ msg: 'found record', result })
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: 'something went wrong' })
    }
}


const userTruncate = async (req, res) => {
    try {
        await User.remove({})
        successHandler(res, constants.TRUNCATE_SUCC_MSG)
    } catch (error) {
        console.error(error)
        errorHandler(res)
    }
}

module.exports = { addUser, userListing, userTruncate, userLogin, searchAnotherUserRecord }