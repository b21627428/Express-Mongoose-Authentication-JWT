const express = require("express");
var bodyParser = require('body-parser')
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
//Import Routes
const authRoute = require("./routes/auth");


const jsonParser = bodyParser.json()


dotenv.config();

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true,useUnifiedTopology: true },
    () => console.log("connected to db")
);

//Route Middlewares
app.use("/api/user",jsonParser,authRoute);


app.listen(3000 , () => console.log("Server Up and running"));