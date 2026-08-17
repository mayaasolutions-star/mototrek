/**
 * CORS Security Configuration
 * Restricts API access to authorized Mototrek origins.
 */

const config = require('./env.config');

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (Postman, server-to-server, cURL) in dev or when origin is undefined
    if (!origin || config.env === 'development') {
      return callback(null, true);
    }
    
    if (config.allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      return callback(new Error(`CORS Policy: Origin ${origin} not permitted`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-Admin-Key'],
  exposedHeaders: ['Content-Range', 'X-Total-Count'],
  maxAge: 86400, // 24 hours preflight cache
};

module.exports = corsOptions;
