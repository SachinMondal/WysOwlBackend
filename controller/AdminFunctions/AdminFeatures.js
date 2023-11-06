const jwt = require('jsonwebtoken');
const Section = require("../../modals/SectionModal");
const Guide = require("../../modals/GuideModal");
const Question = require('../../modals/Questions');
const Unit = require('../../modals/UnitModal');
const Level = require("../../modals/LevelModal");
const Story = require("../../modals/StoryModal");
const { determineContentType } = require('../Utils/fileUtils');

module.exports.uploadSection = async function (req, res) {
    try {

        const section = new Section({
            content: req.body.content,
            // adminId: req.user._id, // Assuming the user's ID is stored in req.user.id
        });


        await section.save();


        return res.status(200).json({
            success: true,
            message: "Section uploaded Successfully",
            section: section,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error uploading section',
            error: err.message,
        });
    }
};



module.exports.uploadGuideBook = async function (req, res) {
    try {
        const guide = new Guide({
            content: req.body.content
        });
        await guide.save();
        return res.status(200).json({
            success: true,
            message: "Guide uploaded Successfully",
            section: guide,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error uploading guide',
            error: err.message,
        });
    }
}



module.exports.uploadQuestion = async function (req, res) {
    try {
        let question = new Question({
            question: req.body.question,
            options: req.body.options
        })
        await question.save();
        return res.status(200).json({
            success: true,
            message: "Question uploaded Successfully",
            section: question,
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error uploading question',
            error: err.message,
        });
    }

}


module.exports.uploadUnit = async function (req, res) {
    try {
        let unit = new Unit({
            name: req.body.name

        })
        await unit.save();
        return res.status(200).json({
            success: true,
            message: "Unit uploaded Successfully",
            section: unit,
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error uploading unit',
            error: err.message,
        });
    }

}

module.exports.newLevel = async function (req, res) {
    try {
        let level = new Level({
            name: req.body.name
        });
        await level.save();
        return res.status(200).json({
            success: true,
            message: "Level created Successfully",
            section: level,
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error in creating Level',
            error: err.message,
        });
    }
}



// Handle the upload of a story
exports.uploadStory = async (req, res) => {
    try {
        const { title } = req.body;
        const fileData = req.file;

        // Determine the content type based on the file extension
        const contentType = determineContentType(fileData.originalname);

        // Create a new Story document and save it to the database
        const newStory = new Story({
            title: title,
            file: {
                data: fileData.buffer,
                contentType: contentType,
            },
            //   author: req.user._id, // Assuming you have user authentication
        });

        const savedStory = await newStory.save();

        res.status(201).json({ success: true, story: savedStory });
    } catch (error) {
        console.error('Error uploading story:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
