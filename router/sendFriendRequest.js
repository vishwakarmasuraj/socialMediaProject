const express = require('express')
const router = express.Router()


const userController = require('../controller/user')



router.get('/verifyJust', userController.verifyToken)


module.exports = router