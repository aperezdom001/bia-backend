const express = require('express');
const router = express.Router();
const Player = require("../models/Player");

const { Schema, model } = require('mongoose');

const playerSchema = new Schema({
    initials: {type: String, required: true, unique: true},
    score: {type: String, required: true}
}); 

module.exports = model('Player', playerSchema);