const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: true,
        trim: true,
    },
    email: {
        required: true,
        type: String,
        unique: true,
        trim: true,
    },
    password: {
        required: true,
        type: String,
        minLength: 6,
    },
    username: {
        required: true,
        type: String,
        trim: true,
    }
});

module.exports = User = mongoose.model('user', userSchema);