const mongoose = require('mongoose')

const Score = new mongoose.Schema({
    name: String,
    score: Number,
    created_at: Number
})

module.exports = mongoose.model('score', Score)