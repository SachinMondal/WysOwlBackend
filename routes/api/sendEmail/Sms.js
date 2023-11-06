const express = require('express');
const router = express.Router();
const accountSid = "AC82b089df8fc618e27e9407fdc5c6ed6c";
const authToken = "44b8ec0850bcb87366c219778863fb31";
const verifySid = "VA7e0c53064c17aeec3a0d3f46c902dc05";
const client = require("twilio")(accountSid, authToken);

// Route to send OTP
router.post('/sendOTP', async (req, res) => {
    const { to } = req.body;
    try {
        // Send OTP via SMS
        const sendVerification = await client.verify.v2.services(verifySid).verifications.create({ to: to, channel: "sms" });
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

    try {
        // Verify OTP
        const verifyOTP = await client.verify.v2.services(verifySid).verificationChecks.create({ to: to, code: otpCode });
        console.log(verifyOTP.status);

        if (verifyOTP.status === 'approved') {
            res.status(200).json({ message: "OTP verified successfully" });
        } else {
            res.status(401).json({ error: "OTP verification failed" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to verify OTP" });
    }
});

module.exports = router;
