const bcrypt = require('bcrypt');
const Admin = require('../modals/AdminModal');
const jwt = require('jsonwebtoken');

module.exports.register = async function (req, res) {
    console.log('register', req.body);
    try {
        const admin = await Admin.create(req.body);
        return res.status(200).json({
            success: true,
            message: 'Admin registration successful',
            redirectTo: '/login' // Redirect URL
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}
module.exports.login = async function (req, res) {
    if (req.isAuthenticated()) {
        return res.status(200).json({
            success: true,
            message: "Authenticated"
        })
    }
    return res.status(500).json({
        success: false,
        message: "bye"
    })
}
module.exports.create = async function (req, res) {
    try {
        let { Email, Password } = req.body;
        if (!Email || !Password) {
            return res.status(400).json({
                success: false,
                message: "No email or password",
            });
        }
        const admin = await Admin.findOne({ Email: Email });
        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }
        const isMatch = await bcrypt.compare(Password, admin.Password);
        console.log(isMatch);
        const objectId = Admin._id;
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "invalid credentials"
            });
        }
        const token = admin.getSignedJwtToken();
        console.log(token);
        res.status(200).json({
            success: true,
            message: `Log in successfully ~ keep the token safe ${Admin.Name}`,
            redirectTo: `/homepage/${objectId}`
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: "Error Occured",
        })
    }
}
module.exports.createSession = async function (req, res) {
    try {

        return res.status(200).json({
            success: true,
            message: 'Session created and cookie set successfully'
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error creating session'
        });
    }
};

module.exports.profile = async function (req, res) {
    Admin.findById(req.params.id, function (err, Admin) {
        if (err) {
            console.log(err);
        }
        return res.render('user_profile', {
            title: 'Admin Profile',
            profile_user: Admin

        });
    });
};

module.exports.updatePassword = async function (req, res) {
    try {
        const { email, newPassword, newConfirmPassword } = req.body;

        // Find the user by email (either Admin or User, as per your data structure)
        const user = await Admin.findOne({ Email: email });


        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        // Check if the provided existing password matches the stored password
        const isMatch = (newPassword === newConfirmPassword)
        console.log(isMatch);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "password not matched"
            });
        }

        user.Password = newPassword;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Error resetting the password"
        });
    }
};



module.exports.logout = async function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            console.log('error', err);
            return next(err);
        }

    })
    return res.status(200).json({
        success: true,
        message: 'Successfully logout'
    })
    // return res.redirect('/');

}