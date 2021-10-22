const express = require('express')
const router = express.Router()


const userController = require('../controller/sendFriendRequest')



router.get('/verifyJust', userController.verifyToken)

router.post('/requestSend', userController.sendFriendRequest)


module.exports = router