const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
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
        minlength: 6,
    },
    /*confirmPassword: {
        required: true,
        type: String,
        trim: true,
    },*/
});

module.exports = User = mongoose.model('User', userSchema);