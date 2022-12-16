const express = require('express');
const router = express.Router();
const { param, checkSchema } = require('express-validator');
const { createSessionValidationSchema } = require('../middlewares/sessionValidations');
const studioSessionController = require('../controllers/studioSessionController');

router.post('/:merchantId', checkSchema(createSessionValidationSchema), studioSessionController.createSession);
router.get('/:merchantId', param('merchantId').isMongoId(), studioSessionController.fetchSessions);

module.exports = router;