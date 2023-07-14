const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const emailSchema = new Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  emaildata: {
    type: String,
    required: true,
  },
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  read: {
    type: Boolean,
    required: true,
    default: false,
  },
  date:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model("Email", emailSchema);
