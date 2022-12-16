const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { StudioSession } = require('../models');

const createSession = async (req, res) => {
    /**
     * This controller adds one or more sessions to the studio with the merchantId. 
     * Sessions are time slots of 45, 60 or 90 minutes and can exist from 9am to 8pm 
     * on weekdays and 10am to 10pm on Saturdays
     */
    // Validate incoming input
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const merchantId = req.params.merchantId;
    const startsAt = req.body.startsAt;
    const endsAt = req.body.endsAt;
    const type = req.body.type;

    try {
        const id = new mongoose.Types.ObjectId();
        // create a new StudioSession object
        const studioSession = await StudioSession.create({
            _id: id,
            sessionId: id,
            merchantId: merchantId,
            startsAt: startsAt,
            endsAt: endsAt,
            type: type
        });

        res.status(200).json({
            sessionId: studioSession.sessionId
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false
        });
    }
}

const fetchSessions = async (req, res) => {
    /**
     * This controller returns session schedules for a merchant
     */
    // Validate incoming input
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const merchantId = req.params.merchantId;
    try {
        const sessions = await StudioSession.find({ merchantId });
        res.status(200).json([...sessions]);
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false
        });
    }
}

module.exports = { createSession, fetchSessions };