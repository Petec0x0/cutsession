const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const merchantSchema = new mongoose.Schema(
    {
        merchantId: Schema.Types.ObjectId,
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

        metadata: {
            type: Object,
            required: true
        },
    },

    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true
    }
);

const Merchant = mongoose.model('Merchant', merchantSchema);
module.exports = Merchant;