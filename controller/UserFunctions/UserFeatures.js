const Section = require("../../modals/SectionModal");
const Unit = require("../../modals/UnitModal");
const Guide = require("../../modals/GuideModal");
const Level = require("../../modals/LevelModal");
const Question = require("../../modals/Questions");
module.exports.getALLSections = async function (req, res) {
    try {
        const sections = await Section.find();
        return res.status(200).json({
            success: true,
            message: "Sections retrieved successfully",
            sections: sections,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error retrieveing sections"
        });
    }
}



module.exports.getALLUnitforParticularSection = async function (req, res) {
    try {
        const sectionId = req.params.sectionId;
        const units = await Unit.find({ sectionId: sectionId });
        return res.status(200).json({
            success: true,
            message: 'Units retrieved successfully for particular section',
            units: units
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error retrieveing units"
        });
    }
}



module.exports.getGuidesForUnitAndSection = async function (req, res) {
    try {
        const { unitId, sectionId } = req.params;
        const guides = await Guide.find({ unitId: unitId, sectionId: sectionId });

        return res.status(200).json({
            success: true,
            message: "Guides retrieved successfully for the unit and section",
            sections: guides
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error retrieveing guide for section and unit"
        });
    }
}



module.exports.getLevelForUnitAndSection = async function (req, res) {
    try {
        const { unitId, sectionId } = req.params;
        const levels = await Level.find({ unitId: unitId, sectionId: sectionId });
        return res.status(200).json({
            success: true,
            message: "Level retrieved successfully for the particular sectiona dn unit",
            levels: levels,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "error in retrieving",

        });
    }
}



module.exports.getQuestionForSectionUnitAndLevel = async function (req, res) {
    try {
        const { sectionId, unitId, levelId } = req.params;
        const questions = await Question.find({
            sectionId: sectionId,
            unitId: unitId,
            levelId: levelId
        });
        return res.status(200).json({
            success: true,
            message: "questions retrived sucessfully",
            questions: questions
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error retrieving questions for the section, unit, and level',
        });
    }
}