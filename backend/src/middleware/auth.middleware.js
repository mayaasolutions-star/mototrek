/**
 * Authentication & Authorization Middleware Stubs
 * Establishes authentication contracts for user and admin routes.
 */

const ApiResponse = require('../utils/apiResponse');

/**
 * Authenticate Registered Customer Token
 */
const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return ApiResponse.error(res, 'Authentication token required.', 'UNAUTHORIZED', 401);
  }

  // Architectural stub for future JWT validation:
  // const token = authHeader.split(' ')[1];
  // req.user = decodedUserPayload;
  return next();
};

/**
 * Authenticate Store Admin Session & Permissions
 */
const authenticateAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return ApiResponse.error(res, 'Admin authentication token required.', 'UNAUTHENTICATED_ADMIN', 401);
  }

  // Architectural stub for future Admin role verification:
  // if (!req.user || req.user.role !== 'admin') {
  //   return ApiResponse.error(res, 'Admin privileges required.', 'FORBIDDEN', 403);
  // }
  return next();
};

/**
 * Require Specific Role Middleware Factory
 * @param {Array<string>} allowedRoles 
 */
const requireRole = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return ApiResponse.error(res, 'Insufficient permissions for this operation.', 'FORBIDDEN', 403);
    }
    return next();
  };
};

module.exports = {
  authenticateUser,
  authenticateAdmin,
  requireRole,
};
