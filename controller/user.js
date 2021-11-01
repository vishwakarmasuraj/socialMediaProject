const User = require('../models/user')
const { successHandler, errorHandler } = require('../helper/responseHandler')
const constants = require('../constant/allConstants')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


/**
 * 
 * @param {*} req is request object that responsible for contaion all body object in it.
 * @param {*} res is response object that is responsible for sending response object.
 *            addUser - This is function which is responsible for Signup user.
 *            userListing - This is function which is responsible for getting all signup listing.
 *            userLogin - This is function which is responsible for user login.
 *            searchAnotherUserRecord - This is function which is responsible for one user can search another user's record.
 *            userLogout - This is a function which is responsible for logout.
 *            userTruncate - This is function which is responsible for truncate database.
 */


const addUser = async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, constants.ROUND)
        const user = await new User(req.body)
        await user.save((error) => {
            if (error) {
                return console.log(`Error has occurred: ${ error }`)
            }
            console.log('Document is successfully saved.')
        })
        successHandler(res, constants.USER_CREATED_MSG)
    } catch (error) {
        errorHandler(res, error)
    }
}

const userListing = async (req, res) => {
    try {
        const result = await User.find({})
        successHandler(res, constants.GET_LISTING, result)
    } catch (error) {
        return errorHandler(res, error)
    }
}

generateToken = (user) => {
    return jwt.sign({ data: user }, process.env.SECRET_KEY, {
        expiresIn: '2h',
    })
}

const userLogin = async (req, res) => {
    try {
        if (!req.body.email || req.body.password == '') {
            res.status(400).json({ message: 'Valid email and password are required' })
        }
        let data = await User.findOne({ email: req.body.email })
        if (!data) {
            return errorHandler(res, constants.EMAILLOGIN_ERR)
        } else {
            await bcrypt.compare(req.body.password, data.password, (error, match) => {
                if (error) {
                    return errorHandler(res, constants.ERROR_MSG, error)
                } else if (match) {
                    successHandler(res, constants.SUCCESSLOGIN, {
                        token: generateToken(data),
                        data,
                    })

                } else {
                    return errorHandler(res, constants.LOGINPASSFAIL)
                }
            })
        }
    } catch (error) {
        errorHandler(res, error)
    }
}

const searchAnotherUserRecord = async (req, res) => {
    try {
        let { search = "" } = req.query
        const result = await User.find({
            $or: [
                { $or: [{ firstName: { $regex: `${ search }`, $options: 'i' } }] },
                { $or: [{ lastName: { $regex: `${ search }`, $options: 'i' } }] },
                { $or: [{ email: search }] },
                { $or: [{ interest: search }] },
                { $or: [{ hobbies: { $in: [search] } }] },
            ]
        })
        successHandler(res, constants.SUCCESS_SEARCHING_MSG, result)
    } catch (error) {
        errorHandler(res, error)
    }
}

const myProfile = async (req, res) => {
    try {
        let profile = req.userData
        res.status(200).json({ message: 'found', profile })
    } catch (error) {
        res.status(500).json({ message: 'something went wrong' })
    }
}

const userTruncate = async (req, res) => {
    try {
        await User.remove({})
        successHandler(res, constants.TRUNCATE_SUCC_MSG)
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports = { addUser, userListing, userTruncate, userLogin, searchAnotherUserRecord, myProfile }