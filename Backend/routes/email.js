const express = require("express");
const router = express.Router();

const emailController = require("../controller/email");

const authMiddleware=require('../middleware/auth')

router.post("/email/send-email",authMiddleware.authenticate, emailController.postSendEmail);

router.get("/email/received-emails",authMiddleware.authenticate,emailController.getReceivedEmails)

router.get("/email/sent-emails",authMiddleware.authenticate,emailController.getSentEmails)

router.put("/email/read-email",authMiddleware.authenticate,emailController.putReadEmail)

module.exports = router;
