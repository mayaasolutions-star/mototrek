/**
 * Health Check Routes
 * GET /api/v1/health
 */

const express = require('express');
const { getHealthStatus } = require('../controllers/health.controller');

const router = express.Router();

router.get('/', getHealthStatus);

module.exports = router;
