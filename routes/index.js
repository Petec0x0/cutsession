const router = require('express').Router();
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const sessionsRoute = require('./sessions.route');

router.use("/", authRoute);
router.use("/", userRoute);
router.use("/studios", sessionsRoute);

module.exports = router;