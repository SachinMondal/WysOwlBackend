let generatedEmail = '';

function setGeneratedEmail(email) {
    generatedEmail = email;
}

function getGeneratedEmail() {
    return generatedEmail;
}

module.exports = {
    setGeneratedEmail,
    getGeneratedEmail
};
