const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const isStringInValid = (string) => {
  if (string == undefined || string == null || string.trim().length == 0) {
    return true;
  } else {
    return false;
  }
};

const generateAccessToken = (id) => {
  return jwt.sign({ userId: id }, process.env.TOKEN_SECRET_KEY);
};
exports.postSignUpUser = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (isStringInValid(email) || isStringInValid(password)) {
      return res.status(400).json({ err: "Enter valid email and password" });
    }
    const user = await User.find({ email: email });
    if (user[0]) {
      return res.status(500).json({ err: "Email already exist" });
    }
    const saltrounds = 10;
    bcrypt.hash(password, saltrounds, async (err, hash) => {
      console.log(err);
      const user = new User({
        email: email,
        password: hash,
      });
      await user.save();
      res.status(201).json({ message: "You are successfully signed up" });
    });
  } catch (err) {
    res.status(500).json({ err: "Something went wrong" });
  }
};

exports.postLoginUser = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (isStringInValid(email) || isStringInValid(password)) {
      return res
        .status(400)
        .json({ err: "Please enter valid Email and password", success: false });
    }
    const users = await User.find({ email: email });
    const user = users[0];
    if (!user) {
      return res.status(404).json({ err: "User not found", success: false });
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        throw new Error("Something went wrong");
      }
      if (result === true) {
        res.status(200).json({
          message: "User Logged in successfully",
          success: true,
          token: generateAccessToken(user._id),
          email: user.email,
          userId: user._id,
        });
      } else {
        res.status(401).json({ err: "Incorrect Password", success: false });
      }
    });
  } catch (err) {
    res.status(500).json({ message: err, success: false });
  }
};
