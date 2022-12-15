const express = require('express');
const router = express.Router();
const { query } = require('express-validator');
const userController = require('../controllers/userController');

router.get('/clients',
    query('type').isIn(['USER', 'MERCHANT']),
    query('limit').isInt({
        gt: 0,
        lt: 50
    }),
    query('offset').isInt({
        gt: 0,
    }), userController.getClients);

module.exports = router;