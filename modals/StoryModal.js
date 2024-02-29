const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,

    },
    file: {
        data: Buffer,
        contentType: String,
        filename: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',

    },

}, {
    timestamps: true
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
