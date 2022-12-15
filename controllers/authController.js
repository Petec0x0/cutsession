const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { User, Merchant } = require('../models');
const { validationResult } = require('express-validator');

const registerUser = async (req, res) => {
    // Validate incoming input
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // create a new user object
        const user = await User.create({
            userId: new mongoose.Types.ObjectId(),
            name: req.body.name,
            dob: req.body.dob,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            cityOfResidence: req.body.cityOfResidence,
            phoneNumber: req.body.phoneNumber,
            metadata: { ...req.body.metadata }
        });

        res.status(200).json({
            userId: user.userId
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false
        });
    }
}

const registerMerchant = async (req, res) => {
    // Validate incoming input
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // create a new merchant object
        const merchant = await Merchant.create({
            merchantId: new mongoose.Types.ObjectId(),
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            cityOfResidence: req.body.cityOfResidence,
            phoneNumber: req.body.phoneNumber,
            metadata: { ...req.body.metadata }
        });

        res.status(200).json({
            merchantId: merchant.merchantId
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false
        });
    }
}

const loginClient = async (req, res) => {
    // Validate incoming input
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const username = req.body.username;
    const password = req.body.password;
    const accessType = req.body.accessType;

    try {
        if (accessType == 'USER') {
            // find user
            const user = await User.findOne({ username: username });
            // check if user exists
            if (!user) {
                return res.status(401).json({
                    error: ["Authentication error: invalid username/password"]
                });
            }
            // check if user password is correct
            const matched = await bcrypt.compare(password, user.password);
            if (!matched) {
                return res.status(401).json({
                    error: ["Authentication error: invalid username/password"]
                });
            }

            // return JWT
            const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({
                userId: user.userId,
                token: token
            });
        } else {
            // find merchant
            const merchant = await Merchant.findOne({ username: username });
            // check if merchant exists
            if (!merchant) {
                return res.status(401).json({
                    error: ["Authentication error: invalid username/password"]
                });
            }
            // check if merchant password is correct
            const matched = await bcrypt.compare(password, merchant.password);
            if (!matched) {
                return res.status(401).json({
                    error: ["Authentication error: invalid username/password"]
                });
            }

            // return JWT
            const token = jwt.sign({ username: merchant.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({
                merchantId: merchant.merchantId,
                token: token
            });
        }

    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false
        });
    }
}

module.exports = { registerUser, registerMerchant, loginClient };