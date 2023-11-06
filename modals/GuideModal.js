const mongoose = require("mongoose");

const guideSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, "content is required"],

    },
    unitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit'
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section"
    }
}, {
    timestamps: true
})
const Guide = mongoose.model('Guide', guideSchema);
module.exports = Guide;