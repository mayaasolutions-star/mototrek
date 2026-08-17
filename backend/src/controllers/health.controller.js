/**
 * Health Check Controller
 * Handles GET /api/v1/health
 */

const ApiResponse = require('../utils/apiResponse');

const getHealthStatus = async (req, res, next) => {
  try {
    const healthData = {
      service: 'mototrek-api',
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      uptime: Math.floor(process.uptime()),
    };
    return ApiResponse.success(res, healthData, 200);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getHealthStatus,
};
