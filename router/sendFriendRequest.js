const express = require('express')
const router = express.Router()


const requestValidateRule = require('../middleware/sendRequest')
const requestValid = require('../middleware/valid')

const userController = require('../controller/sendFriendRequest')



router.get('/verifyJust', userController.verifyToken)

router.post('/requestSend', requestValidateRule.sendRequestValidationRule(), requestValid.validate, userController.sendFriendRequest)

router.get('/friendList', userController.friendRequestListing)


module.exports = router