const express = require("express")
const cors = require("cors")
const app = express()
const collection = require('./models/User')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
//const mongoose=require("mongoose")

/*const conn_str = 'mongodb+srv://jms86025:3D8j84qg$@projectcluster.togn60n.mongodb.net';
mongoose.connect(conn_str)
.then(() => {
    console.log("mongodb connected");
})
.catch(() => {
    console.log('failed');
})*/

app.get("/login", cors(), (req,res) => {

})

app.post("/login",async(req,res) =>{
    const{email, password} = req.body

    try {
        const check=await User.findOne({email:email})
        if (check) {
            res.json("exist")
        }
        else {
            res.json("notexist")
        }
    }
    catch(e) {
        res.json("notexist")
    }
})

app.post("/register",async(req,res) =>{
    const{name, email, password} = req.body

    const data={
        name:name,
        email: email,
        password:password
    }
    try {
        const check=await User.findOne({email:email})
        if (check) {
            res.json("exist")
        }
        else {
            res.json("notexist")
            await User.insertMany({data})
        }
    }
    catch(e) {
        res.json("notexist")
    }
})

app.listen(3000,() => {
    console.log("port connected");
})