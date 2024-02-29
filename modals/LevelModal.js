const mongoose = require("mongoose");
const levelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    unitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit'
    },
    sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section'
    }

}, {
    timestamps: true
});
const Level = mongoose.model("Level", levelSchema);
module.exports = Level;