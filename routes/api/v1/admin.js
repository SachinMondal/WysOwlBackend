const express = require("express");
const router = express.Router();
const passport = require('passport');
const AdminController = require('../../../controller/AdminController');
const AdminFunctions = require("../../../controller/AdminFunctions/AdminFeatures");
const authenticate = require("../../../config/middleware");


router.post('/register', AdminController.register);

router.post('/loggingin', AdminController.login);

router.post('/update', authenticate, AdminController.updateUser)
router.post('/forgot-password', AdminController.resetPassword)




router.post('/createSection',
    authenticate,
    AdminFunctions.createSection);
router.post('/addnewunit/:sectionId',
    authenticate,
    AdminFunctions.uploadUnit);
router.post('/createGuide/:sectionId/:unitId',
    authenticate,
    AdminFunctions.uploadGuideBook)
router.post('/addnewlevel/:sectionId/:unitId',
    authenticate,
    AdminFunctions.newLevel);
router.post('/addnewquestion/:sectionId/:unitId/:levelId',
    authenticate,
    AdminFunctions.uploadQuestion);

router.post('/addnewstory',
    authenticate,
    AdminFunctions.uploadStory);


router.get('/logout', AdminController.logout);

module.exports = router;
