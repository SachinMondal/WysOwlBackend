module.exports.generateOTP = () => {
    const length = 5;
    const charset = "0123456789";
    let OTP = "";

    for (let i = 0; i < length - 1; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        OTP += charset[randomIndex];
    }

    return OTP;
}



