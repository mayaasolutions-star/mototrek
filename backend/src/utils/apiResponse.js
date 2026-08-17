/**
 * Standardized API Response Helper
 * Ensures consistent JSON responses across all endpoints.
 */

class ApiResponse {
  /**
   * Send Success Response
   * @param {Object} res - Express response object
   * @param {Object|Array} data - Payload data
   * @param {number} statusCode - HTTP Status code (default 200)
   * @param {Object} meta - Optional pagination/metadata
   */
  static success(res, data = {}, statusCode = 200, meta = null) {
    const payload = {
      success: true,
      data,
    };
    if (meta) {
      payload.meta = meta;
    }
    return res.status(statusCode).json(payload);
  }

  /**
   * Send Error Response
   * @param {Object} res - Express response object
   * @param {string} message - Error message
   * @param {string} code - Machine-readable error code
   * @param {number} statusCode - HTTP Status code (default 400)
   * @param {Array} details - Optional field validation errors
   */
  static error(res, message = 'An error occurred', code = 'INTERNAL_ERROR', statusCode = 400, details = null) {
    const payload = {
      success: false,
      error: {
        code,
        message,
      },
    };
    if (details) {
      payload.error.details = details;
    }
    return res.status(statusCode).json(payload);
  }
}

module.exports = ApiResponse;
