const express = require("express");
const router = express.Router();
router.use('/validateEmail', require('./Email'));
router.use('/smsVerification', require('./Sms'));
module.exports = router;