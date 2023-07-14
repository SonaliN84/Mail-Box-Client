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

    const server=app.listen(3000);
    const io=require('./socket').init(server);
    io.on("connection",(socket)=>{
      socket.on("joinroom",(room)=>{
        socket.join(room)
        console.log("room joined",room)
      })
      socket.on("leaveroom",(room)=>{
        socket.leave(room)
      })
      console.log("Client connected")
    })
  })
  .catch((err) => {
    console.log(err);
  });



  