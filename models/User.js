const mongoose = require("mongoose");
const conn_str = 'mongodb+srv://jms86025:3D8j84qg$@projectcluster.togn60n.mongodb.net';
mongoose.connect(conn_str)
.then(() => {
    console.log("mongodb connected");
})
.catch(() => {
    console.log('failed');
})
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
const collection = mongoose.model('collection', userSchema);
module.exports = collection;