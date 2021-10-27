const express = require('express')
const router = express.Router()

const userValidateRule = require('../middleware/validationRule')
const valid = require('../middleware/valid')

const authToken = require('../middleware/authToken')

const userController = require('../controller/user')

router.post('/api/signup', userValidateRule.validationRule(), valid.validate, userController.addUser)

router.get('/api/list', userController.userListing)

router.post('/api/login', userController.userLogin)

router.get('/findAllRecord', userController.searchAnotherUserRecord)

router.get('/verify', userController.verifyToken)

router.get('/logout/:_id', userController.userLogout)

router.delete('/truncate', userController.userTruncate)

// router.post('/sendReq', userController.requestSend)

module.exports = router