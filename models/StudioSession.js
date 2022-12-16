const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studioSessionSchema = new mongoose.Schema(
    {   
        sessionId: Schema.Types.ObjectId,
        merchantId: {
            type: mongoose.Types.ObjectId,
            ref: 'Merchant'
        },
        startsAt: {
            type: String
        },
        endsAt: {
            type: String
        },
        type: {
            type: String,
            enum: ["WeekDay", "WeekEnd"],
        }
    },
    {
        timestamps: false
    }
);

const StudioSession = mongoose.model('StudioSession', studioSessionSchema);
module.exports = StudioSession;