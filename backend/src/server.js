/**
 * Mototrek Backend Server Bootstrap
 * Entry point for launching HTTP server listener.
 */

const app = require('./app');
const config = require('./config/env.config');
const logger = require('./utils/logger');
const { seedDemoData } = require('./seed');

const PORT = config.port;

// Automatically seed relational demo data in dev mode
seedDemoData();

const server = app.listen(PORT, () => {
  logger.info(`Mototrek API Server running in [${config.env}] mode on port ${PORT}`);
  logger.info(`Health check available at http://localhost:${PORT}${config.apiPrefix}/health`);
});

// Handle uncaught exceptions & unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise);
  logger.error('Reason:', reason);
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

module.exports = server;
