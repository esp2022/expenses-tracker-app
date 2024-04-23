const express = require("express");
const bcryptjs = require("bcryptjs");
const userRouter = express.Router();
const jwt = require("jsonwebtoken")
const auth = require("../../middleware/auth");
const User = require('../../models/User');
const Item = require('../../models/users');
var bodyParser = require("body-parser");

//Signup Route
userRouter.post("/signup", async (req, res) => {
    try {
        const { email, password, confirmPassword} = req.body;
        if (!email || !passowrd || !username || !confirmPassword) {
            return res.status(400).json({ msg: "Please enter all fields"});
        }
        if (password. length < 6) {
            return res
            .status (400)
            .json({ msg: "Password should be atleast 6 characters" });
        }
        if (confirmPassword != password) {
            return res. status (400).json({ msg: "Both the passwords dont match" });
        }
        const existingUser = await User.findOne({email });
        if (existingUser) {
        return res
        .status (400)
        .json({ msg: "User with the same email already exists" });
        }
        const hashedPassword = await bcryptjs.hash(password, 8);
        const newUser = new User({ email, password: hashedPassword, username });
        
        const savedUser = await newUser.save ();
        console.log(savedUser.username);
        res.json (savedUser);
    }   catch (err) {
        res. status (500).json({ error: err.message });
    }
});






//router.get('/',(req,res) => {res.send('testing get / itemroute')});
//router.get('/:id', (req, res) => {res.send('testing get /:id route')});
//router.post('/',(req,res) => {res.send('testing post / route')});
//router.put('/:id', (req, res) => {res.send('testing put /:id route')});
//router.delete('/:id', (req, res) => {res.send('testing delete /:id route')});

router.post('/', bodyParser.json(), (req,res)=> {
    Item.create(req.body)
        .then((item) => res.json({ msg: 'Item added successfully'}))
        .catch((err) => res.status(400).json({ error: 'Error' }));
});

router.get('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then((item) => res.json(item))
        .catch((err) => res.status(404).json({ noitemfound: 'No Item found'}));
});

router.get('/', (req, res) => {
    Item.find()
        .then((items) => res.json(items))
        .catch((err) => res.status(404).json({ noitemsfound: 'No Items found'}));
});

router.put('/:id', (req, res) => {
    Item.findByIdAndUpdate(req.params.id, req.body)
    .then((item) => res.json({ msg: 'Updated successfully' }))
    .catch((err) =>
        res.status(400).json({ error: 'Unable to update the Database' })
    );
});

router.delete('/:id', (req, res) => {
    Item.findByIdAndDelete(req.params.id)
    .then((item) => res.json({ mgs: 'Item entry deleted successfully'}))
    .catch((err) => res.status(404).json({ error: 'No such a item' }));
});


module.exports = router;
