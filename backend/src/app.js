/**
 * Express Application Configuration
 * Mounts security headers, CORS, body parsers, routes, and global error handlers.
 */

const express = require('express');
const cors = require('cors');
const config = require('./config/env.config');
const corsOptions = require('./config/cors.config');
const { securityHeaders, limiter } = require('./middleware/security.middleware');
const requestLogger = require('./middleware/requestLogger.middleware');
const { notFoundHandler, errorHandler } = require('./middleware/error.middleware');
const routes = require('./routes');

const app = express();

// Security HTTP Headers & Rate Limiter
app.use(securityHeaders);
app.use(limiter);

// CORS Policy
app.use(cors(corsOptions));

// Request Logging
app.use(requestLogger);

// Body Parsing Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Mount Versioned REST API Routes (/api/v1)
app.use(config.apiPrefix, routes);

// 404 Route Not Found Handler
app.use(notFoundHandler);

// Global Error Handler
app.use(errorHandler);

module.exports = app;
