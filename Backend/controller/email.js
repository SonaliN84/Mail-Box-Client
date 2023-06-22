const Email = require("../models/email");
const User = require("../models/user");
exports.postSendEmail = async (req, res, next) => {
  try {
    const to = req.body.to;
    const from = req.body.from;
    const subject = req.body.subject;
    const emaildata = req.body.emaildata;
    const date = req.body.date;

    const receivers = await User.find({ email: to });
    const receiver = receivers[0];
    if (!receiver) {
      return res
        .status(400)
        .json({
          err: "Please enter valid email address.Entered Email does not exist.",
        });
    }
    const email = new Email({
      to: to,
      from: from,
      subject: subject,
      emaildata: emaildata,
      senderId: req.user._id,
      receiverId: receiver._id,
      date: date,
    });
    console.log(email);
    await email.save();
    res.status(201).json({ message: "Email sent successfully" });
  } catch (err) {
    res.status(500).json({ err: "Something went wrong" });
  }
};

exports.getReceivedEmails = async (req, res, next) => {
  try {
    const receivedEmails = await Email.find({ receiverId: req.user._id });
    res.status(200).json({ receivedEmails: receivedEmails, success: true });
  } catch (err) {
    res.status(500).json({ err: "Something went wrong" });
  }
};

exports.getSentEmails = async (req, res, next) => {
  try {
    const sentEmails = await Email.find({ senderId: req.user._id });
    res.status(200).json({ sentEmails: sentEmails, success: true });
  } catch (err) {
    res.status(500).json({ err: "Something went wrong" });
  }
};
