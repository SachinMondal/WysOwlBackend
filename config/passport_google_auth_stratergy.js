const passport = require('passport');
const GoogleStratergy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const Admin = require('../modals/AdminModal');

const User = require('../modals/UserModal');


//passport using the google stratergy
passport.use(new GoogleStratergy({
    clientID: "175596792337-edf3a7l6ke6omfrbj5h7mu853hvpln3r.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:5000/users/auth/google/callback",
},
    function (accessToken, refreshToken, profile, done) {
        const email = profile.emails[0].value;
        Admin.findOne({ Email: email }).exec(function (err, Admin) {
            if (err) {
                console.log('error in google stratergy passport', err);
                return done(err);
            }

            if (Admin) {
                return done(null, Admin);
            } else {
                Admin.create({
                    Name: profile.displayName,
                    Email: email,
                    Password: crypto.randomBytes(5).toString('hex')
                }, function (err, newAdmin) {
                    if (err) {
                        console.log('error in creating user google stratergy', err);
                        return done(err);
                    }
                    return done(null, newAdmin);
                })
            }
        })
        User.findOne({ Email: email }).exec(function (err, User) {
            if (err) {
                console.log('error in google stratergy passport', err);
                return done(err);
            }

            if (User) {
                return done(null, User);
            } else {
                Admin.create({
                    Name: profile.displayName,
                    Email: email,
                    Password: crypto.randomBytes(5).toString('hex')
                }, function (err, newUser) {
                    if (err) {
                        console.log('error in creating user google stratergy', err);
                        return;
                    }
                    return done(null, newUser);
                })
            }
        })
    }
))
module.exports = passport;