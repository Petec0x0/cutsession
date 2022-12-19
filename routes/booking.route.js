const express = require('express');
const router = express.Router();
const { query, checkSchema } = require('express-validator');
const { createBookingValidationSchema } = require('../middlewares/bookingValidations');
const bookingControlller = require('../controllers/bookingControlller');

router.post('/', checkSchema(createBookingValidationSchema), bookingControlller.bookASession);
router.get('/',
    query('city').not().isEmpty(),
    query('limit').isInt({
        gt: 0,
        lt: 50
    }),
    query('offset').isInt({
        gt: 0,
    }), bookingControlller.retrieveBookedSessions);

module.exports = router;