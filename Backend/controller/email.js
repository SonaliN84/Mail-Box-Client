const Email = require("../models/email");
const User = require("../models/user");
const io = require("../socket");
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
      return res.status(400).json({
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
    const id = receiver._id.toString();
    io.getIO().to(id).emit("new-received-email", { email: email });

    const id1 = req.user._id.toString();
    io.getIO().to(id1).emit("new-sent-email", { email: email });
    res.status(201).json({ message: "Email sent successfully" });
  } catch (err) {
    res.status(500).json({ err: "Something went wrong" });
  }
};

// exports.getReceivedEmails = async (req, res, next) => {
//   try {
//     const receivedEmails = await Email.find({ receiverId: req.user._id });
//     res.status(200).json({ receivedEmails: receivedEmails, success: true });
//   } catch (err) {
//     res.status(500).json({ err: "Something went wrong" });
//   }
// };

exports.getSentEmails = async (req, res, next) => {
  try {
    const sentEmails = await Email.find({ senderId: req.user._id });
    res.status(200).json({ sentEmails: sentEmails, success: true });
  } catch (err) {
    res.status(500).json({ err: "Something went wrong" });
  }
};

exports.putReadEmail = async (req, res, next) => {
  try {
    const emailId = req.params.emailId;
    const email = await Email.findById(emailId);
    email.read = true;
    await email.save();
    console.log("senderId", email.senderId);
    const id = email.senderId.toString();
    console.log(id);
    io.getIO().to(id).emit("read-email", { emailId: email._id });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ err: "Something went wrong" });
  }
};

exports.deleteEmail = async (req, res, next) => {
  try {
    const emailId = req.params.emailId;
    const email = await Email.findById(emailId);
    email.receiverId = null;
    await email.save();
    res.status(200).json({ message: "Email deleted", success: true });
  } catch (err) {
    res.status(500).json({ err: "Something went wrong" });
  }
};

exports.getReceivedEmails = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);
    console.log(page);
    let size = parseInt(req.query.size);
    console.log(size);
    const total = await Email.count({ receiverId: req.user._id });
    console.log("TOtal", total);

    let offset = total - page * size;
    console.log("offset", offset);
    let limit = size;
    if (offset < 0) {
      offset = 0;
      limit = total - (page - 1) * size;
    }
    console.log("new offset", offset);
    console.log(limit, "limit");

    const receivedEmails = await Email.find({ receiverId: req.user._id })
      .limit(limit)
      .skip(offset);

    return res.status(200).json({ receivedEmails, total, page, size });
  } catch (err) {
    return res.status(500).json({ error: err, success: false });
  }
};
