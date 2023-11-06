const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../modals/AdminModal');
const User = require('../modals/UserModal');

// Admin authentication strategy
passport.use('Admin-local', new LocalStrategy({
    usernameField: 'Email',
    passReqToCallback: true
}, function (req, Email, Password, done) {
    Admin.findOne({ Email: Email }, function (err, admin) {
        if (err) {
            return done(err);
        }

        if (!admin || admin.Password !== Password) {
            return done(null, false, { message: 'Invalid credentials' });
        }

        return done(null, admin);
    });
}));

// User authentication strategy
passport.use('User-local', new LocalStrategy({
    usernameField: 'Email',
    passReqToCallback: true
}, async function (req, Email, Password, done) {
    try {
        console.log('User-local strategy started');
        const user = await User.findOne({ Email: Email });
        if (!user) {
            console.log('User not found');
            return done(null, false, { message: 'User not found' });
        }

        const isMatch = user.matchPassword(Password);

        if (!isMatch) {
            console.log('Incorrect password');
            return done(null, false, { message: 'Incorrect password' });
        }

        console.log('User-local strategy completed');
        return done(null, user);
    } catch (err) {
        console.log('Error in User-local strategy:', err);
        return done(err);
    }
}));

// Serialization and deserialization for both Admins and Users
passport.serializeUser(function (user, done) {
    console.log('User serialized:', user);
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    Admin.findById(id, function (err, admin) {
        if (err) {
            console.log('Error in finding Admin --> Passport', err);
            return done(err);
        }

        if (admin) {
            done(null, admin);
        } else {
            User.findById(id, function (err, user) {
                if (err) {
                    console.log('Error in finding User --> Passport', err);
                    return done(err);
                }
                console.log('User deserialized:', user);
                done(null, user);
            });
        }
    });
});

// Middleware to check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
    try {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
    } catch (err) {
        console.log('Authentication error:', err);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Middleware to set authenticated user in locals
passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user; // Use 'user' instead of 'User'
    }
    next();
};

module.exports = passport;
