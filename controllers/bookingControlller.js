const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { Booking, StudioSession } = require('../models');
const { RandomStrategy, DerivedStrategy, BookingRef } = require('../utils');

const bookASession = async (req, res) => {
    /**
     * This controller books an available studio session 
     * for a user.
     */
    // Validate incoming input
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const sessionId = req.body.sessionId;
    const date = req.body.date;
    const userId = req.body.userId;
    const notes = req.body.notes;
    const title = req.body.title;

    // find the picked session
    const session = await StudioSession.findOne({ sessionId });
    const id = new mongoose.Types.ObjectId();
    const strategy = new DerivedStrategy(9, [id, date]);
    //const strategy = new RandomStrategy(9, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    const bookingRef = new BookingRef(strategy).generateRef();

    // create a new Booking object
    const booking = await Booking.create({
        _id: id,
        bookingId: id,
        bookingRef: bookingRef,
        userId: userId,
        sessionId: sessionId,
        date: date,
        startsAt: session.startsAt,
        endsAt: session.endsAt,
        notes: notes,
        title: title
    });

    res.status(200).json({
        bookingId: booking.bookingId,
        bookingRef: booking.bookingRef
    });

    try {

    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false
        });
    }
}

const retrieveBookedSessions = async (req, res) => {
    /**
     * This controller retrieve a paginated list of bookings for a city. 
     * Can narrow down to bookings for a merchant and within a period. 
     * Period can be a single date or a date-range formatted as startDate:endDate
     */
    // Validate incoming input
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 1;
    const city = req.query.city;
    const merchant = req.query.merchant || '';
    const period = req.query.period;
    let startDate = new Date(-8640000000000000);
    let endDate = new Date(8640000000000000);

    try {
        // check if peroid was specified
        if (period) {
            // check if period has start and end date
            const splitPeriod = period.split(':');
            if (splitPeriod.length > 1) {
                startDate = new Date(splitPeriod[0]);
                endDate = new Date(splitPeriod[1]);
            } else {
                startDate = new Date(splitPeriod[0]);
            }
        }

        let bookings;
        bookings = await Booking.find({
            date: {
                "$gte": startDate,
                "$lt": endDate
            }
        })
            .skip((offset - 1) * limit)
            .limit(limit);

        res.status(200).json({
            count: bookings.length,
            next: "http://example.com",
            previous: "http://example.com",
            data: bookings
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false
        });
    }
}

module.exports = { bookASession, retrieveBookedSessions };