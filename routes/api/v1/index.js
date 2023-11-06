const express = require("express");
const router = express.Router();
console.log("router loaded");
router.use('/admin', require('./admin'));
router.use('/user', require('./user'));
module.exports = router;