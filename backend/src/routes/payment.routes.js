const express = require('express');
const { getAllPayments } = require('../controllers/payment.controller');

const router = express.Router();

router.get('/', getAllPayments);

module.exports = router;
