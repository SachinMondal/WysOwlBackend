const passport = require("passport");
require('dotenv').config();
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const Admin = require('../modals/AdminModal');
const User = require('../modals/UserModal');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.secret_key,
};

passport.use(new JWTStrategy(opts, async function (jwtPayload, done) {
    try {
        const admin = await Admin.findById(jwtPayload.id);
        if (admin) {
            return done(null, admin);
        }

        const user = await User.findById(jwtPayload.id);
        if (user) {
            return done(null, user);
        }

        return done(null, false);
    } catch (err) {
        console.log('Error:', err);
        return done(err, false);
    }
}));

module.exports = passport;
