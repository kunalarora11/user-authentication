const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// Importing routes
const authRoute = require('./routes/auth');
const privateRoute = require('./routes/privateRoute');

// for .env file
dotenv.config();

// Connecting to db
mongoose.connect(process.env.MONGO_URI,
    { useNewUrlParser: true , useUnifiedTopology: true , useCreateIndex: true },
    () => console.log("Connected to DB!!"));

// Middleware
// for req.body - to read the data i.e body parser
app.use(express.json());

// Routes middlewares
app.use('/user', authRoute);
app.use('/user/private', privateRoute);

const port = process.env.PORT || 8000;
app.listen(port,() => console.log(`Server is listening on port ${port}`));

app.get('/', function (req,res) {
    // console.log("boom");
    res.send("boom")
})