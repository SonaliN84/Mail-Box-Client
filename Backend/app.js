const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const userRoutes=require('./routes/user')
const emailRoutes=require('./routes/email')
const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: false }));

app.use(userRoutes)
app.use(emailRoutes)

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("connected");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
