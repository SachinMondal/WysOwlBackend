const mongoose = require("mongoose");
const DB = 'mongodb+srv://test1:test@WysOwl.lw4e192.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(DB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error in connecting to the databse'));
db.once('open', function () {
    console.log("Successfully connected to the databse: MONGODB");

});
module.exports = db;
