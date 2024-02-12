require('dotenv').config();
const express = require('express');
const router = express.Router();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const verifySid = process.env.VERIFY_SID;
const client = require("twilio")(accountSid, authToken);

// Route to send OTP
router.post('/sendOTP', async (req, res) => {
    const { to } = req.body;
    console.log(to);
    try {
        // Send OTP via SMS

        const sendVerification = await client.verify.v2.services(verifySid).verifications.create({ to: "+91" + to, channel: "sms" });
        console.log(sendVerification.status);

        res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to send OTP" });
    }
});

// Route to verify OTP
router.post('/verifyOTP', async (req, res) => {
    const { to, otpCode } = req.body;
    console.log(to, otpCode);
    try {
        // Verify OTP
        const verifyOTP = await client.verify.v2.services(verifySid).verificationChecks.create({ to: "+91" + to, code: otpCode });
        console.log(verifyOTP.status);

        if (verifyOTP.status === 'approved') {
            res.status(200).json({ message: "OTP verified successfully", statusCode: '200' });
        } else {
            res.status(401).json({ error: "OTP verification failed", statusCode: '401' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to verify OTP" });
    }
});

module.exports = router;
