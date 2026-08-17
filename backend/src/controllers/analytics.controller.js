/**
 * Dashboard Metrics & Operations Analytics Controller
 * Implements strict Asia/Kolkata date filtering for store metrics.
 */

const ProductModel = require('../models/product.model');
const OrderModel = require('../models/order.model');
const UserModel = require('../models/user.model');

// Helper to check if ISO timestamp falls within Asia/Kolkata (IST = UTC+5:30) date ranges
function isTimestampInRange(isoString, range) {
  if (!isoString) return false;
  if (range === 'lifetime') return true;

  const date = new Date(isoString);
  // IST offset in MS = 5.5 * 3600 * 1000
  const istOffsetMs = 5.5 * 3600 * 1000;
  const istDate = new Date(date.getTime() + istOffsetMs);
  const nowIst = new Date(Date.now() + istOffsetMs);

  const istYear = istDate.getUTCFullYear();
  const istMonth = istDate.getUTCMonth();
  const istDay = istDate.getUTCDate();

  const nowYear = nowIst.getUTCFullYear();
  const nowMonth = nowIst.getUTCMonth();
  const nowDay = nowIst.getUTCDate();

  if (range === 'today') {
    return istYear === nowYear && istMonth === nowMonth && istDay === nowDay;
  }

  if (range === 'yesterday') {
    const yesterdayIst = new Date(nowIst);
    yesterdayIst.setUTCDate(nowDay - 1);
    return (
      istYear === yesterdayIst.getUTCFullYear() &&
      istMonth === yesterdayIst.getUTCMonth() &&
      istDay === yesterdayIst.getUTCDate()
    );
  }

  if (range === 'week') {
    // Current week start (Monday)
    const dayOfWeek = nowIst.getUTCDay() || 7; // Sunday = 7
    const mondayIst = new Date(nowIst);
    mondayIst.setUTCDate(nowDay - (dayOfWeek - 1));
    mondayIst.setUTCHours(0, 0, 0, 0);
    return istDate >= mondayIst;
  }

  if (range === 'month') {
    return istYear === nowYear && istMonth === nowMonth;
  }

  return true;
}

const getDashboardMetrics = async (req, res, next) => {
  try {
    const range = (req.query.range || 'lifetime').toLowerCase();

    // 1. All Products for Current State Metrics (Products Live & Out of Stock)
    const allProducts = ProductModel.getAllProducts({ status: 'Active', visibility: 'Visible' });
    const productsLive = allProducts.length;

    // Out of stock product: a product whose total stock is 0
    const outOfStockProducts = allProducts.filter((p) => {
      const stock = p.totalStock !== undefined ? p.totalStock : p.stock || 0;
      return stock === 0;
    }).length;

    // 2. All Registered Users for Time-based Signed-up Users Metric
    const allUsers = UserModel.getAllUsers() || [];
    const filteredUsers = allUsers.filter((u) => isTimestampInRange(u.createdAt, range));
    const signedUpUsers = filteredUsers.length;

    // 3. All Orders for Time-based Orders Placed, Amount Made, Customers With Orders
    const allOrders = await OrderModel.findAll();
    // Exclude cancelled orders from successful revenue & placed count
    const validOrders = allOrders.filter((o) => o.orderStatus !== 'Cancelled');
    const filteredOrders = validOrders.filter((o) => isTimestampInRange(o.createdAt, range));

    const ordersPlaced = filteredOrders.length;
    const amountMade = filteredOrders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);

    // Customers with orders: count of UNIQUE customer accounts/emails who placed qualifying orders in this period
    const uniqueCustomerSet = new Set(
      filteredOrders.map((o) => o.customerId || o.email || o.customerName).filter(Boolean)
    );
    const customersWithOrders = uniqueCustomerSet.size;

    return res.status(200).json({
      success: true,
      data: {
        range,
        signedUpUsers,
        ordersPlaced,
        amountMade,
        productsLive,
        outOfStockProducts,
        customersWithOrders,
      },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getDashboardMetrics,
};
