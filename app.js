const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const port = process.env.PORT
const routes = require('./router')
const passport = require('passport')
const config = process.env

app.use(passport.initialize());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(routes)

mongoose.connect(config.DATABASE_CONNECTION).then(() => {
    console.log('Successfully connected ')
});
mongoose.connection.on('error', function (err) {
    console.log('Error: Could not connect to Database.');
});

app.listen(port, () => console.log(`Server is listening at ${ port }`))