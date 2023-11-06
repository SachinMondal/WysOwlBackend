const User = require('../modals/UserModal');
const jwt = require('jsonwebtoken');
module.exports.register = async function (req, res) {
    console.log('register', req.body);
    try {
        const user = await User.create(req.body);
        return res.status(200).json({
            success: true,
            message: User
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
        // return res.redirect('/teacher/profile');
        return res.send('login page');
    }
    // return res.render('', {
    //     // title:
    // })
}
module.exports.signup = async function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/teacher/login');
    }
    return res.render('', {
        // title:
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
        const user = await User.findOne({ Email: Email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }
        const isMatch = await User.matchPassword(Password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "invalid credentials"
            });
        }
        const token = User.getSignedJwtToken();
        console.log(token);
        res.status(200).json({
            success: true,
            message: `Log in successfully ~ keep the token safe ${User.Name}`
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
        const user = req.user; // Assuming req.user is the authenticated user object

        // Set a cookie named 'user_id' with the user's ID as the value
        res.cookie('user_id', user._id, {
            httpOnly: true, // Prevents JavaScript access to the cookie
            maxAge: 24 * 60 * 60 * 1000, // Cookie will expire in 1 day (optional)
            // Other cookie options can be added here
        });

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
    try {
        const user = await User.findById(req.params.id).exec();
        return res.status(200).send(User);
        // return res.render('user_profile', {
        //     title: 'User Profile',
        //     profile_user: User
        // });
    } catch (err) {
        console.log(err);
        // Handle the error and send an appropriate response
        return res.status(500).send(`Internal Server Error : ${err}`);
    }
}






module.exports.update = async (req, res) => {
    const userID = req.params.id;
    console.log(userID);
    console.log('req.user:', req.User);
    const updatedData = {
        Name: req.body.Name,
        ClassRoll: req.body.ClassRoll,
        Section: req.body.Section,
        Year: req.body.Year,
        Email: req.body.Email,
        Password: req.body.Password,
    }
    try {
        // Use req.user._id instead of req.User._id
        if (req.user._id == userID) {
            const updatedUser = await User.findByIdAndUpdate(userID, updatedData, {
                new: true,
                runValidators: true
            }).exec();
            if (!updatedUser) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }
            return res.json({
                success: true,
                message: 'User Updated Successfully'
            });

        } else {
            console.log('inside else');
            return res.status(403).json({
                success: false,
                message: 'Unauthorized'
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Error: ${err}`
        });
    }
}







module.exports.logout = async function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            console.log('error', err);
            return next(err);
        }

    })
    return res.status(200).json({
        success: true,
        message: `Successfully logout ~ ${req.Name}`
    })
    // return res.redirect('/');

}