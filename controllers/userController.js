const { User, Merchant } = require('../models');
const { validationResult } = require('express-validator');
const { count } = require('../models/Merchant');

const getClients = async (req, res) => {
    /**
     * This controller returns all the user/merchants
     * in the users/merchants collection
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
    const type = req.query.type;
    const city = req.query.city || '';
    const name = req.query.name || '';

    try {
        let clients;
        if (type == 'USER') {
            clients = await User.find({
                cityOfResidence: { $regex: '.*' + city + '.*' },
                name: { $regex: '.*' + name + '.*' }
            })
                .skip((offset - 1) * limit)
                .limit(limit);
        } else {
            clients = await Merchant.find({
                cityOfResidence: { $regex: '.*' + city + '.*' },
                name: { $regex: '.*' + name + '.*' }
            })
                .skip((offset - 1) * limit)
                .limit(limit);
        }

        res.status(200).json({
            count: clients.length,
            next: "http://example.com",
            previous: "http://example.com",
            data: clients
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false
        });
    }
}

module.exports = { getClients }; 