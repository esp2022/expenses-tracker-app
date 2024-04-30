const express = require('express');
const app = express();
const port = process.env.PORT || 8085;
const mongoose = require('mongoose');
const cors = require('cors')


app.use(express.json());
app.use(cors({origin: true, credentials: true}));
const users = require("./routes/api/users");
const expenses = require("./routes/api/expenses");
app.use('/api/users', users);
app.use('/api/expenses', expenses);

const conn_str = 'mongodb+srv://dbrohank66:dbwebprogram24@projectcluster.zxyq81l.mongodb.net/?retryWrites=true&w=majority&appName=ProjectCluster';
mongoose.set('strictQuery', false);
mongoose.connect(conn_str).then(() => {
    app.listen(port, () => console.log(`Server running on port${port}`));
    console.log('MongoDB Connection Suceeded...');
})
.catch(err => {
    console.log("Error in DB Connection ${err}");
})



