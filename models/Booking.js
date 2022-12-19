const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new mongoose.Schema(
    {
        bookingId: Schema.Types.ObjectId,
        bookingRef: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        sessionId: {
            type: Schema.Types.ObjectId,
            ref: 'StudioSession',
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        startsAt: {
            type: String,
            required: true
        },
        endsAt: {
            type: String,
            required: true
        },
        title: {
            type: String
        },
        notes: {
            type: String
        }
    },
    {
        timestamps: false
    }
);

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;