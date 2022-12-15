const router = require('express').Router();
const authRoute = require('./auth.route');
const userRoute = require('./user.route');

router.use("/", authRoute);
router.use("/", userRoute);

module.exports = router;