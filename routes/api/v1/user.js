const express = require("express");
const router = express.Router();
const UserController = require('../../../controller/UserController');
const UserFunction = require("../../../controller/UserFunctions/UserFeatures");
const passport = require('passport');
const authenticate = require("../../../config/middleware");


router.post('/register', UserController.register);

router.post('/login', UserController.login);
router.post('/update', authenticate, UserController.updateUser);

router.get('/logout', UserController.logout);
router.post('/forget-password', UserController.resetPassword);


router.get('/getALLSections',
    authenticate,
    UserFunction.getALLSections);
router.get('/getALLUnits/:sectionId',
    authenticate,
    UserFunction.getALLUnitforParticularSection);

router.get('/getALLGuides/:sectionId/:unitId',
    authenticate,
    UserFunction.getGuidesForUnitAndSection);

router.get('/getAllLevel/:sectionId/:unitId',
    authenticate,
    UserFunction.getLevelForUnitAndSection);
router.get('/getAllquestion/:sectionId/:unitId/:levelId',
    authenticate,
    UserFunction.getQuestionForSectionUnitAndLevel);









module.exports = router;
