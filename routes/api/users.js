const express = require("express");
const bcryptjs = require("bcryptjs");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const secretKey = "mySecretKey";
const User = require('../../models/User');
var bodyParser = require("body-parser");


//Signup Route
userRouter.post("/register", async (req,res) => {
    try {
        //const {username, email, password, confirmPassword,} = req.body;
        console.log(req.body);
        if (!req.body.Username || !req.body.Email || !req.body.Password || !req.body.ConfirmPassword) {
            return res.status(410).json({msg: "Please enter all fields"});
        }
        if (req.body.Password.length < 6) {
            return res
                .status(410)
                .json({msg: "Password should be at least 6 characters"});
        }
        if (req.body.ConfirmPassword !== req.body.Password) {
            return res.status(410).json({ msg: "Passwords do not match"});
        }
        console.log("made it to 4");
        const existingUser = await User.findOne({email: req.body.Email});
        console.log(existingUser);
        if (existingUser) {
            console.log("made it to 6 for some reason");
            return res
                .status(410)
                .json({ msg: "User with the same email already exists"})
        }
        const hashedPassword = await bcryptjs.hash(req.body.Password, 8);
        console.log("made it to 7");
        const newUser = new User({ email: req.body.Email, password: hashedPassword, username: req.body.Username});
        console.log("made it to 8");
        console.log(newUser)

        const savedUser = await newUser.save();
        console.log("made it to 9");
        console.log(savedUser.username);
        res.json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});


//Login Route
userRouter.post("/login", async (req, res) => {
    try {
        if (!req.body.Email || !req.body.Password) {
            return res.status(410).json({ msg: "Please enter all fields"})
        }
        const user = await User.findOne({email: req.body.Email});
        console.log(user);
        if (req.body.User) {
            return res
                .status(410)
                .send({ msg: "User with this email does not exist"});
        }
        console.log("made it here");
        const isMatch = await bcryptjs.compare(req.body.Password, user.password);
        console.log(isMatch);
        if (!isMatch) {
            return res.status(410).send({ msg: "Incorrect password"});
        }
        const token = jwt.sign({ id: user._id }, secretKey);
        console.log(token);
        res.json({ token, user: {id: user._id, username: user.username } });
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
    
});

// Check if token is valid
userRouter.post("/tokenIsValid", async (req, res) => {
    try {
        const token = req.header("Authorization");
        if (!token) return res.json(false);
        const verified = jwt.verify(tokenParts[1], secretKey);
        if(!verified) return res.json(false);
        const user = await User.findById(verified.id);
        if (!user) return res.json(false);
        return res.json(true);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//get user from db
userRouter.get('/:userId', (req, res) => {
    User.findById(req.params.userId)
    .then((user) => res.json(user))
    .catch((err) => res.status(404).json({nouserfound: 'No User Found'}));
});

// update user data in db
userRouter.put('/:userId', bodyParser.json(), async (req, res) => {
    if ('password' in req.body) {
        const hashedPassword = await bcryptjs.hash(req.body.password, 8);
        req.body.password = hashedPassword;
    }
    User.findByIdAndUpdate(req.params.userId, req.body)
    .then((user) => res.json({ msg: 'Updated Successfully' }))
    .catch((err) =>
        res.status(400).json({ error: 'Unable to Update' })
    );
});

// delete user from db
userRouter.delete('/:userId', (req,res) => {
    User.findByIdAndDelete(req.params.userId)
    .then((item) => res.json({ msg: 'Item Deleted Successfully'}))
    .catch((err) => res.status(404).json({ error: 'Nonexistent Item'}));
});




module.exports = userRouter;