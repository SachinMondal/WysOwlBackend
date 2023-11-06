const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, 'Name is Required'],
    },
    Email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: [true, "Email is required"]
    },
    Password: {
        type: String,
        minlength: 6,
        required: [true, "Password Is Required"]
    },
    MobileNumber: {
        type: Number,
        maxlength: 10
    },
    Photo: {
        dataBuffer: {
            type: Buffer,
        },
        contentType: {
            type: String,
        }
    },
    age: {
        type: Number,
        required: true
    }
});

// Encrypt password
adminSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);
    next();
});

// sign jwt and return 
adminSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, 'secret', {
        expiresIn: '120m'
    });
};


//we are using bcrypt library, another function of checking the password entered with the password in database
adminSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.Password);

};



const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
