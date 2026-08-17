/**
 * PostgreSQL Database Connection Pool Abstraction
 * Isolates SQL execution from HTTP controllers.
 */

const { Pool } = require('pg');
const config = require('./env.config');

const poolConfig = config.database.url
  ? { connectionString: config.database.url }
  : {
      host: config.database.host,
      port: config.database.port,
      database: config.database.name,
      user: config.database.user,
      password: config.database.password,
      max: config.database.maxConnections,
      idleTimeoutMillis: config.database.idleTimeoutMillis,
    };

const pool = new Pool(poolConfig);

pool.on('error', (err) => {
  console.error('Unexpected PostgreSQL Pool Error:', err);
});

/**
 * Execute SQL Query
 * @param {string} text - SQL query string
 * @param {Array} params - Query parameters
 */
const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    if (config.env === 'development') {
      console.log(`Executed Query: ${text} | Duration: ${duration}ms | Rows: ${res.rowCount}`);
    }
    return res;
  } catch (error) {
    console.error(`Database Query Error: ${error.message}`);
    throw error;
  }
};

/**
 * Get Client from Pool for Transactions
 */
const getClient = async () => {
  return await pool.connect();
};

module.exports = {
  pool,
  query,
  getClient,
};
