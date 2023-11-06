const mongoose = require("mongoose");


const sectionSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, "content is required"],

    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    }
}, {
    timestamps: true
})
const Section = mongoose.model('Section', sectionSchema);
module.exports = Section;