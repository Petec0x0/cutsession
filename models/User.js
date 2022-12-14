const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String
        },

        email: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true
        },

        name: {
            type: String,
            required: true
        },

        cityOfResidence: {
            type: String,
            required: true
        },
        
        phoneNumber: {
            type: String,
            required: true
        },

        dob: {
            type: Date,
            required: true
        },

        metadata: {
            type: Object,
            required: true
        },
    },

    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;