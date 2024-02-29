const jwt = require('jsonwebtoken');
const Section = require("../../modals/SectionModal");
const Guide = require("../../modals/GuideModal");
const Question = require('../../modals/Questions');
const Unit = require('../../modals/UnitModal');
const Level = require("../../modals/LevelModal");
const Story = require("../../modals/StoryModal");
const { determineContentType } = require('../Utils/fileUtils');

module.exports.createSection = async (req, res) => {
    try {
        const { content } = req.body;
        const adminId = req.user._id;
        const section = await Section.create({ content, adminId });
        return res.status(201).json({
            success: true,
            message: "Section created successfully",

        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error creating section",
            error: error.message,
        });
    }
};


module.exports.uploadUnit = async function (req, res) {
    try {
        const adminId = req.user.id;
        const sectionId = req.params.sectionId;
        let unit = new Unit({
            name: req.body.name,
            adminId,
            sectionId
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


module.exports.uploadGuideBook = async function (req, res) {
    try {
        const adminId = req.user.id;
        const sectionId = req.params.sectionId;
        const unitId = req.params.unitId;
        const guide = new Guide({
            content: req.body.content,
            sectionId,
            unitId,
            adminId
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

module.exports.newLevel = async function (req, res) {
    try {
        const adminId = req.user.id;
        const sectionId = req.params.sectionId;
        const unitId = req.params.unitId;
        let level = new Level({
            name: req.body.name,
            adminId, sectionId, unitId
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


module.exports.uploadQuestion = async function (req, res) {
    try {
        const adminId = req.user.id;
        const sectionId = req.params.sectionId;
        const unitId = req.params.unitId;
        const levelId = req.params.levelId;
        let question = new Question({
            question: req.body.question,
            options: req.body.options,
            explanation: req.body.explanation,
            adminId, sectionId, levelId, unitId
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





exports.uploadStory = async (req, res) => {
    try {
        const { title, content } = req.body;
        const fileData = req.file;
        const adminId = req.user.id;

        let storyData = { title, content, adminId };

        if (fileData) {
            const contentType = determineContentType(fileData.originalname);
            storyData.file = {
                data: fileData.buffer,
                contentType: contentType,
            };
        }

        const newStory = new Story(storyData);
        const savedStory = await newStory.save();

        res.status(201).json({ success: true, story: savedStory });
    } catch (error) {
        console.error('Error uploading story:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
