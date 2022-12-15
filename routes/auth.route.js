const express = require('express');
const router = express.Router();
const { checkSchema } = require('express-validator');
const {
    registerUserValidationSchema,
    registerMerchantValidationSchema,
    loginValidationSchema
} = require('../middlewares/validations');
const authController = require('../controllers/authController');

router.post('/register/users', checkSchema(registerUserValidationSchema), authController.registerUser);
router.post('/register/merchants', checkSchema(registerMerchantValidationSchema), authController.registerMerchant);
router.post('/sign-in', checkSchema(loginValidationSchema), authController.loginClient);

module.exports = router;