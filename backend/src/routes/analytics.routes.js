const express = require('express');
const { getDashboardMetrics } = require('../controllers/analytics.controller');

const router = express.Router();

router.get('/dashboard', getDashboardMetrics);

module.exports = router;
