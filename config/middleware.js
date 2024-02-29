const jwtProvider = require("../config/passport_jwt_stratergy");
const User = require("../modals/UserModal");
const Admin = require("../modals/AdminModal");

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(404).send({ error: "Token not found" });
        }

        const userId = jwtProvider.getUserIdFromToken(token);

        console.log("user", userId);

        const user = await User.findById(userId);
        if (user) {
            req.user = user;
            return next();
        }


        const admin = await Admin.findById(userId);
        if (admin) {
            req.user = admin;
            return next();
        }


        return res.status(404).send({ error: "User or admin not found" });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

module.exports = authenticate;
