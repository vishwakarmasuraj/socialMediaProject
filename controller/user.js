const User = require('../models/user')
const { successHandler, errorHandler } = require('../helper/responseHandler')
const constants = require('../constant/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')






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

const userTruncate = async (req, res) => {
    try {
        await User.remove({})
        successHandler(res, constants.TRUNCATE_SUCC_MSG)
    } catch (error) {
        console.error(error)
        errorHandler(res)
    }
}

module.exports = { addUser, userListing, userTruncate }