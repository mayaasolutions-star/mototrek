/**
 * Security Middleware Layer
 * Configures Helmet headers and Express Rate Limiting.
 */

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const config = require('../config/env.config');

// Rate limiting configuration (100 requests per 15 mins in production)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: config.env === 'production' ? 100 : 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests from this IP. Please try again later.',
    },
  },
});

// Helmet security HTTP headers
const securityHeaders = helmet({
  contentSecurityPolicy: false, // Managed at frontend Nginx layer if needed
  crossOriginResourcePolicy: { policy: 'cross-origin' },
});

module.exports = {
  limiter,
  securityHeaders,
};
