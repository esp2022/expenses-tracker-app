const express = require('express');
const app = express();
const port = process.env.PORT || 3003;
const mongoose = require('mongoose');
const cors = require('cors')
const users = require("./routes/api/users");

app.use('/api/users', users);
app.use(cors({origin: true, credentials: true}));
app.get ('/', (req, res) => res.send('Hello world!'));
app.get('/user/:id', (req, res) => {
    res.send(`user ${req.params.id}`)
})

const conn_str = 'mongodb+srv://dbrohank66:dbwebprogram24@projectcluster.zxyq81l.mongodb.net/'
mongoose.set('strictQuery', false);
mongoose.connect(conn_str).then(() => {
    app.listen(port, () => console.log(`Server running on port${port}`));
    console.log('MongoDB Connection Suceeded...');
})
.catch(err => {
    console.log("Error in DB Connection ${err}");
});


