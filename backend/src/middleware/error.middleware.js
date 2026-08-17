/**
 * Centralized Error Handling Middleware
 * Prevents stack trace leak in production while returning clean JSON.
 */

const ApiResponse = require('../utils/apiResponse');
const logger = require('../utils/logger');
const config = require('../config/env.config');

/**
 * Global 404 Route Not Found Middleware
 */
const notFoundHandler = (req, res, next) => {
  return ApiResponse.error(
    res,
    `Cannot ${req.method} ${req.originalUrl}`,
    'RESOURCE_NOT_FOUND',
    404
  );
};

/**
 * Global Error Handling Middleware
 */
const errorHandler = (err, req, res, next) => {
  logger.error(`Error processing ${req.method} ${req.originalUrl}:`, err.stack || err.message);

  const statusCode = err.statusCode || 500;
  const errorCode = err.code || 'INTERNAL_SERVER_ERROR';
  const message = config.env === 'production' && statusCode === 500
    ? 'An internal server error occurred.'
    : err.message || 'An unexpected error occurred.';

  return ApiResponse.error(
    res,
    message,
    errorCode,
    statusCode,
    err.details || null
  );
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
