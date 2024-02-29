
const jwtProvider = require("../config/passport_jwt_stratergy");
const bcrypt = require("bcrypt");
const User = require("../modals/UserModal");

const register = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const jwt = jwtProvider.generateToken(user._id);

        return res.status(200).json({
            success: true,
            message: "Register success",
            jwt: jwt
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error.message });
    }
}

const login = async (req, res) => {
    try {
        let { Email, MobileNumber, Password } = req.body;
        console.log(req.body);
        if ((!Email && !MobileNumber) || !Password) {
            return res.status(400).json({
                success: false,
                message: "No email/phone number or password provided",
                statusCode: 400
            });
        }

        let user;
        if (Email) {
            console.log('1');
            user = await User.findOne({ Email: Email });
        } else if (MobileNumber) {
            console.log('2');
            user = await User.findOne({ MobileNumber: MobileNumber });
        }
        console.log(user);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials",
                statusCode: 401
            });
        }

        const isPasswordValid = await bcrypt.compare(Password, user.Password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: "Invalid Password..." });
        }

        const jwt = jwtProvider.generateToken(user._id);
        // Set the token to localStorage


        return res.status(200).send({ token: jwt, message: "Login success", success: true });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const logout = async function (req, res, next) {
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


}


const updateUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const updates = req.body;


        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
}


const resetPassword = async function (req, res) {
    try {
        const { Email, newPassword, newConfirmPassword } = req.body;
        const user = await User.findOne({ Email: Email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }


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

module.exports = { register, login, logout, updateUser, resetPassword };