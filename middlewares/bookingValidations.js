const { StudioSession } = require('../models');

const createBookingValidationSchema = {
    sessionId: {
        isMongoId: true,
        custom: {
            options: value => {
                return StudioSession.findOne({
                    sessionId: value
                }).then(session => {
                    if (!session) {
                        return Promise.reject('Invalid session Id')
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
