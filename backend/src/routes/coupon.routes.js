const express = require('express');
const { getAllCoupons, validateCoupon } = require('../controllers/coupon.controller');

const router = express.Router();

router.get('/', getAllCoupons);
router.post('/validate', validateCoupon);

module.exports = router;
