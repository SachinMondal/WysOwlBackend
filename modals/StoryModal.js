const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    file: {
        data: Buffer,
        contentType: String, // Store the content type of the file (e.g., 'video/mp4' or 'image/gif')
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
