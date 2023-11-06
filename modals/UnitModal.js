const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section'
    }
}, {
    timestamps: true
});

const Unit = mongoose.model('Unit', unitSchema);
module.exports = Unit;