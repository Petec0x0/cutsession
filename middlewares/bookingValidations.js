const { StudioSession, Booking } = require('../models');

const createBookingValidationSchema = {
    date: {
        isDate: true,
        errorMessage: "Please pass a valid booking date",
    },
    sessionId: {
        isMongoId: true,
        custom: {
            options: async (value, { req }) => {
                // make sure the session haven't been booked for that day.
                const date = req.body.date;
                const booking = await Booking.find({
                    sessionId: value,
                    date: date
                });
                if (booking.length > 0) {
                    throw ('Session/Slot already taken by another customer');
                }
                // check if session is valid
                return StudioSession.findOne({
                    sessionId: value
                }).then(session => {
                    if (!session) {
                        return Promise.reject('Invalid session Id');
                    }

                    // make sure the select date matches the session type (WeekEnd Or WeekDay)
                    const weekPeriod = session.type;
                    const date = new Date(req.body.date);
                    // exit if date is sunday
                    if (date.getDay() == 0) {
                        return Promise.reject('Sessions can\'t be booked on a Sunday');
                    }

                    // if date is Saturday, make sure selected session is for WeekEnd
                    if ((date.getDay() == 6) && !(weekPeriod == 'WeekEnd')) {
                        return Promise.reject('Please select a valid weekend session for this date');
                    }

                    // if date is weekday, make sure selected session is for WeekDay
                    if (((date.getDay() > 0) && (date.getDay() < 6)) && !(weekPeriod == 'WeekDay')) {
                        return Promise.reject('You can only booked weekday sessions on weekdays');
                    }
                });
            }
        }
    },
    userId: {
        isMongoId: true
    },
}

module.exports = { createBookingValidationSchema };
