const express = require("express");
const router = express.Router();
const passport = require('passport');
const AdminController = require('../../../controller/AdminController');
const AdminFunctions = require("../../../controller/AdminFunctions/AdminFeatures");


// router.get('/profile/:id', passport.checkAuthentication, AdminController.profile);

router.post('/register', AdminController.register);
router.get('/login', AdminController.login);
router.post('/loggingin', AdminController.create);

// router.post('/create', AdminController.create);
router.post('/create-session', (req, res, next) => {
    passport.authenticate('Admin-local', (err, admin, info) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
        if (!admin) {

            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        req.logIn(admin, function (err) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Internal server error'
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Logged in successfully'
            });
        });
    })(req, res, next);
});


// Use 'google' (all lowercase) as the strategy name
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/admin/login' }), AdminController.createSession);
router.post('/forgotPassword',
    // passport.authenticate('jwt', { session: false }), 
    AdminController.updatePassword)



////////////////////////////////////ADMIN FEATURES/////////////////////
router.post('/createSection',
    // passport.checkAuthentication,
    AdminFunctions.uploadSection);
router.post('/createGuide',
    // passport.checkAuthentication, 
    AdminFunctions.uploadGuideBook)
router.post('/addnewquestion',
    // passport.checkAuthentication,
    AdminFunctions.uploadQuestion);
router.post('/addnewunit',
    // passport.checkAuthentication,
    AdminFunctions.uploadUnit);
router.post('/addnewlevel',
    // passport.checkAuthentication,
    AdminFunctions.newLevel);
router.post('/addnewstory',
    // passport.checkAuthentication,
    AdminFunctions.uploadStory);


router.get('/logout', AdminController.logout);

module.exports = router;
