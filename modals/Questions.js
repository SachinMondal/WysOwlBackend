const mongoose = require("mongoose");


const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "question is required"]
    },
    options: [
        {
            text: {
                type: String,
                require: true,
            },
            isCorrect: {
                type: Boolean,
                required: true
            }
        }
    ],
    explanation: {
        type: String,
        required: true
    },
    unitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit'
    },
    levelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Level'
    },
    sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section'
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    }

});
const Question = mongoose.model('Question', questionSchema);
module.exports = Question;