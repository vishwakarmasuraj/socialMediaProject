const express = require('express')
const router = express.Router()


router.use('/userRecord', require('./user'))

module.exports = router