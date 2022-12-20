const { StudioSession, Booking } = require('../models');

const createBookingValidationSchema = {
    sessionId: {
        isMongoId: true,
        custom: {
            options: value => {
                return StudioSession.findOne({
                    sessionId: value
                }).then(session => {
                    if (!session) {
                        return Promise.reject('Invalid session Id');
                    }
                })
            },
            options: (value, { req }) => {
                const date = req.body.date;
                return Booking.find({
                    sessionId: value,
                    date: date
                }).then(booking => {
                    if (booking.length > 0) {
                        return Promise.reject('Session/Slot already taken by another customer');
                    }
                })
            }
        }
    },
    date: {
        isDate: true,
        errorMessage: "Please pass a valid booking date",
    },
    userId: {
        isMongoId: true
    },
}

module.exports = { createBookingValidationSchema };
