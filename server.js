//import express from 'express'
//require all my modules

require('dotenv').config();
// console.log(process.env.SECRET_KEY);
if(!process.env.SECRET_KEY) {
    console.log('ERROR: missing secret');
  }

const cors = require('cors');
const Player = require('./models/Player');
const express = require('express');
const mongoose = require('mongoose');
const SECRET = process.env.SECRET_KEY;
const app = express();
const PORT = process.env.PORT || 8080;

//define my database and middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    console.log(req.body);
    next();
})

mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    connectTimeoutMS: 3000
})

mongoose.connection.once('connected', () => console.log('Connected to Mongo Life is Good'));

app.use('/player', require('./controllers/playerController'));


app.listen(PORT, () => console.log('hello i am listening on Port: ', PORT));
