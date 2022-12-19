const router = require('express').Router();
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const sessionsRoute = require('./sessions.route');
const bookingRoute = require('./booking.route');

router.use("/", authRoute);
router.use("/", userRoute);
router.use("/studios", sessionsRoute);
router.use("/bookings", bookingRoute);

module.exports = router;