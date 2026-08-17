/**
 * Logger Utility
 * Clean logging abstraction for application events.
 */

const logger = {
  info: (msg, meta = '') => {
    console.log(`[INFO] ${new Date().toISOString()} - ${msg}`, meta);
  },
  warn: (msg, meta = '') => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${msg}`, meta);
  },
  error: (msg, error = '') => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${msg}`, error);
  },
  debug: (msg, meta = '') => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEBUG] ${new Date().toISOString()} - ${msg}`, meta);
    }
  },
};

module.exports = logger;
