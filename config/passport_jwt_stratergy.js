const jwt = require('jsonwebtoken');
require('dotenv').config()
const SECRET_KEY = "s7bDSueNzDZIF7cynLZt11NQZWvITwuZ";
const generateToken = (userId) => {
    const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "48h" })
    return token;
}

const getUserIdFromToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, SECRET_KEY);
        return decodedToken.userId;
    } catch (error) {
        console.error("Error verifying token:", error);
    }
}
module.exports = { generateToken, getUserIdFromToken };