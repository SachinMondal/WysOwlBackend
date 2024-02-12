const express = require("express");
const router = express.Router();
const UserController = require('../../../controller/UserController');
const UserFunction = require("../../../controller/UserFunctions/UserFeatures");
const passport = require('passport');

// Import your StudentModal here
const Student = require("../../../modals/UserModal");

// Get student profile
router.get('/profile/:id', passport.checkAuthentication, UserController.profile);

// Student signup
router.post('/register', UserController.register);

// Create student
router.post('/login', UserController.create);

// Student login
// router.post('/login', passport.authenticate('student-local'), (req, res) => {
//     // This handler will be called after successful authentication
//     // You can send a success JSON response or any other data
//     res.json({ success: true, message: 'Login successful' });
// });

// Google authentication routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    // This handler will be called after successful authentication
    // You can send a success JSON response or any other data
    res.json({ success: true, message: 'Google authentication successful' });
});

// Update student information
router.post('/update/:id', passport.checkAuthentication, UserController.update);

// Logout student
router.get('/logout', UserController.logout);

// Handle authentication failure
router.post('/login', (req, res) => {
    // This handler will be called if authentication fails
    // You can send an error JSON response or any other data
    res.status(401).json({ success: false, message: 'Authentication failed' });
});


////////////////////USER FEATURES//////////////////////////////////
router.get('/getALLSections',
    // passport.checkAuthentication,
    UserFunction.getALLSections);
router.post('/getALLUnits/:sectionId',
    // passport.checkAuthentication,
    UserFunction.getALLUnitforParticularSection);

router.post('/getALLGuides/:sectionId/:unitId',
    // passport.checkAuthentication,
    UserFunction.getGuidesForUnitAndSection);

router.post('/getAllLevel/:sectionId/:unitId',
    // passport.checkAuthentication,
    UserFunction.getLevelForUnitAndSection);
router.post('/getAllquestion/:sectionId/:unitId/:levelId',
    // passport.checkAuthentication,
    UserFunction.getQuestionForSectionUnitAndLevel);









module.exports = router;
