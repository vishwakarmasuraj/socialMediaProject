const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const port = process.env.PORT
const routes = require('./router')
const passport = require('passport')

app.use(passport.initialize());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.use(routes)

mongoose.connect(process.env.DATABASE_CONNECTION).then(() => {
    console.log('connected successfully')
})

app.listen(port, () => console.log(`Server is listening at ${ port }`))