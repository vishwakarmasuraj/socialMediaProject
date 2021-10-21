const express = require('express')
const router = express.Router()

const userValidateRule = require('../middleware/validationRule')
const valid = require('../middleware/valid')

const userController = require('../controller/user')

router.post('/api/signup', userValidateRule.validationRule(), valid.validate, userController.addUser)

router.get('/api/list', userController.userListing)

router.post('/api/login', userController.userLogin)

router.get('/findAllRecord', userController.searchAnotherUserRecord)

router.get('/verify', userController.verifyToken)

router.delete('/truncate', userController.userTruncate)

module.exports = router