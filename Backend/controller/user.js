const User = require("../models/user");
const bcrypt = require("bcrypt");

const isStringInValid = (string) => {
  if (string == undefined || string == null || string.trim().length == 0) {
    return true;
  } else {
    return false;
  }
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
