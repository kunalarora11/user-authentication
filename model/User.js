const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 4
    },
    username: {
        type: String,
        required: true,
        unique: true,
        min: 5,
        max: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 10,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);