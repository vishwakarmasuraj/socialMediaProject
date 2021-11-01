const express = require('express')
const router = express.Router()
const authUser = require('../middleware/authToken')
const userValidateRule = require('../middleware/validationRule')
const valid = require('../middleware/valid')
const userController = require('../controller/user')

router.post('/signup', userValidateRule.validationRule(), valid.validate, userController.addUser)

router.get('/list', authUser.verifyToken, userController.userListing)

router.post('/login', userController.userLogin)

router.get('/get-users', authUser.verifyToken, userController.searchAnotherUserRecord)

router.get('/my-profile', authUser.verifyToken, userController.myProfile)

router.delete('/truncate', userController.userTruncate)

module.exports = router