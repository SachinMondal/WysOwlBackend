const mongoose = require("mongoose");
const levelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    adminId: {
        type: String,
        ref: 'Admin'
    },
    unitId: {
        type: String,
        ref: 'Unit'
    },
    sectionId: {
        type: String,
        ref: 'Section'
    }

}, {
    timestamps: true
});
const Level = mongoose.model("Level", levelSchema);
module.exports = Level;