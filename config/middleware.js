const jwt = require('jsonwebtoken');
const Admin = require('../modals/AdminModal');
const User = require('../modals/UserModal');
exports.verifyToken = async (req, res, next) => {
    console.log("Bearer Token: " + req.headers['authorization']);
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        console.log("Token : " + token);
        req.token = token;

    }
    if (!token) {
        console.log("token error");
        return res.status(401).json({
            success: false,
            message: "unauthorized access token"
        });
    }
    try {
        const decoded = await jwt.verify(token, 'secret');
        console.log("decode token: " + JSON.stringify(decoded));
        req.Admin = await Admin.findById(decoded.id);
        req.User = await User.findById(decoded.id);
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            success: false,
            message: "Unauthorized access"
        });
    }
}