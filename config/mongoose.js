const mongoose = require("mongoose");
require('dotenv').config();
const DB = process.env.Mongo_db;
mongoose.connect(DB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error in connecting to the databse'));
db.once('open', function () {
    console.log("Successfully connected to the databse: MONGODB");

});
module.exports = db;
