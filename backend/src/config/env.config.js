/**
 * Environment Configuration Module
 * Loads and validates environment variables.
 */

const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from backend/.env if present
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 5000,
  apiPrefix: process.env.API_PREFIX || '/api/v1',
  
  // Frontend URLs for CORS
  clientUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  adminUrl: process.env.ADMIN_URL || 'http://localhost:3000/admin',
  allowedOrigins: (process.env.ALLOWED_ORIGINS || 'http://localhost:3000,https://mototrek.in').split(','),

  // Database Connection
  database: {
    url: process.env.DATABASE_URL || '',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    name: process.env.DB_NAME || 'mototrek_db',
    user: process.env.DB_USER || 'mototrek_user',
    password: process.env.DB_PASSWORD || '',
    maxConnections: parseInt(process.env.DB_POOL_MAX, 10) || 20,
    idleTimeoutMillis: parseInt(process.env.DB_POOL_IDLE_TIMEOUT, 10) || 30000,
  },

  // JWT Security
  jwt: {
    secret: process.env.JWT_SECRET || 'dev_jwt_secret_change_in_production',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },

  // Third-Party Service Placeholders
  payment: {
    keyId: process.env.PAYMENT_GATEWAY_KEY || '',
    keySecret: process.env.PAYMENT_GATEWAY_SECRET || '',
    webhookSecret: process.env.PAYMENT_WEBHOOK_SECRET || '',
  },
  shipping: {
    apiKey: process.env.SHIPPING_API_KEY || '',
    apiSecret: process.env.SHIPPING_API_SECRET || '',
  },
  email: {
    apiKey: process.env.EMAIL_API_KEY || '',
  },
};

module.exports = config;
