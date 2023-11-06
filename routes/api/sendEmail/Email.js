const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const otp = require('../../../config/randomTop');
const helper = require('../../../config/helper');
let generatedOTP; // Declare a variable to store the OTP

router.post('/otpUserRecognition', (req, res) => {

    const { to } = req.body;
    const generatedEmail = to;
    helper.setGeneratedEmail(generatedEmail);


    generatedOTP = otp.generateOTP(); // Store the generated OTP

    // Create a transporter with the necessary credentials
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'temporaysachin@gmail.com',
            pass: 'usonuipeurekdqgl'
        }
    });

    // Email options
    const mailOptions = {
        from: 'temporaysachin@gmail.com',
        to: to,
        subject: 'OTP User Recognition',
        text: `Here's your OTP: ${generatedOTP}` // Use the stored OTP
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'An error occurred while sending the email' });
        } else {
            console.log('Email sent successfully:', info.response);
            res.status(200).json({ message: 'Email sent successfully' });
        }
    });


});

// Add a new route for OTP verification
router.post('/verify-otp', (req, res) => {
    const { enteredOTP } = req.body;
    if (enteredOTP === generatedOTP) {
        const storedEmail = helper.getGeneratedEmail();
        res.status(200).json({ message: 'OTP verification successful', email: storedEmail });
    } else {
        res.status(400).json({ message: 'Incorrect OTP' });
    }

});


module.exports = router;
