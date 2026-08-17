const UserModel = require('../models/user.model');
const OrderModel = require('../models/order.model');
const PosBillModel = require('../models/posBill.model');
const ApiResponse = require('../utils/apiResponse');

const normalizePhone = UserModel.normalizePhone;

const getAllCustomers = async (req, res, next) => {
  try {
    const users = UserModel.getAllUsers();
    const allOrders = await OrderModel.findAll();
    const allPosBills = PosBillModel.getAllPosBills();

    // Enrich each user with unified online + POS metrics
    const enrichedUsers = users.map((u) => {
      const cleanUserPhone = normalizePhone(u.mobile);

      // Match Online Orders
      const onlineOrders = allOrders.filter(
        (o) =>
          o.customerId === u.id ||
          (cleanUserPhone && normalizePhone(o.mobile) === cleanUserPhone) ||
          (u.email && o.email && o.email.toLowerCase() === u.email.toLowerCase())
      );

      // Match POS Bills
      const posBills = allPosBills.filter(
        (b) =>
          b.customerId === u.id ||
          (cleanUserPhone && normalizePhone(b.mobile) === cleanUserPhone)
      );

      // Determine Source
      const hasWebsite = onlineOrders.length > 0 || u.source === 'Website' || u.source === 'Website + POS';
      const hasPos = posBills.length > 0 || u.source === 'POS' || u.source === 'Website + POS';
      const accountSource = hasWebsite && hasPos ? 'Website + POS' : hasWebsite ? 'Website' : 'POS';

      // Totals
      const completedOnline = onlineOrders.filter((o) => o.orderStatus !== 'Cancelled');
      const totalOnlineSpent = completedOnline.reduce((sum, o) => sum + (Number(o.grandTotal) || 0), 0);
      const totalPosSpent = posBills.reduce((sum, b) => sum + (Number(b.grandTotal) || 0), 0);

      const totalOrdersCount = onlineOrders.length + posBills.length;
      const totalSpentSum = totalOnlineSpent + totalPosSpent;

      // Dates
      const allDates = [
        ...onlineOrders.map((o) => new Date(o.createdAt || o.orderDate)),
        ...posBills.map((b) => new Date(b.createdAt)),
      ].filter((d) => !isNaN(d.getTime()));

      allDates.sort((a, b) => b - a);

      const lastPurchase = allDates.length > 0 ? allDates[0].toISOString() : null;
      const lastActive = lastPurchase || u.createdAt;

      return {
        ...u,
        source: accountSource,
        totalOrders: totalOrdersCount,
        totalSpent: totalSpentSum,
        lastActive: lastActive,
        lastPurchase: lastPurchase,
        onlineOrdersCount: onlineOrders.length,
        posBillsCount: posBills.length,
      };
    });

    return ApiResponse.success(res, enrichedUsers, 200, { total: enrichedUsers.length });
  } catch (error) {
    return next(error);
  }
};

const getCustomerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const users = UserModel.getAllUsers();
    const cleanId = id.trim();

    // Find customer by ID, customerCode, phone, email, or slug
    const cleanPhone = normalizePhone(cleanId);
    let user = users.find(
      (u) =>
        u.id === cleanId ||
        u.customerCode === cleanId ||
        String(u.id).toLowerCase() === cleanId.toLowerCase() ||
        (u.customerCode && u.customerCode.toLowerCase() === cleanId.toLowerCase()) ||
        (cleanPhone && normalizePhone(u.mobile) === cleanPhone) ||
        (u.email && u.email.toLowerCase() === cleanId.toLowerCase())
    );

    if (!user) {
      const cleanSlug = cleanId.toLowerCase().replace(/[^a-z0-9]/g, "");
      user = users.find((u) => {
        const uNameClean = (u.name || "").toLowerCase().replace(/[^a-z0-9]/g, "");
        const uIdClean = (u.id || "").toLowerCase().replace(/[^a-z0-9]/g, "");
        const uCodeClean = (u.customerCode || "").toLowerCase().replace(/[^a-z0-9]/g, "");
        return uNameClean.includes(cleanSlug) || cleanSlug.includes(uNameClean) || uIdClean.includes(cleanSlug) || uCodeClean.includes(cleanSlug);
      });
    }

    if (!user && users.length > 0) {
      user = users[0];
    }

    if (!user) {
      return ApiResponse.error(res, 'Customer not found', 'NOT_FOUND', 404);
    }

    const cleanUserPhone = normalizePhone(user.mobile);
    const allOrders = await OrderModel.findAll();
    const allPosBills = PosBillModel.getAllPosBills();

    // Match Online Orders
    const onlineOrders = allOrders.filter(
      (o) =>
        o.customerId === user.id ||
        o.customerId === user.customerCode ||
        (cleanUserPhone && normalizePhone(o.mobile) === cleanUserPhone) ||
        (user.email && o.email && o.email.toLowerCase() === user.email.toLowerCase())
    );

    // Match POS Bills
    const posBills = allPosBills.filter(
      (b) =>
        b.customerId === user.id ||
        b.customerId === user.customerCode ||
        (cleanUserPhone && normalizePhone(b.mobile) === cleanUserPhone)
    );

    // Format combined order history
    const combinedHistory = [
      ...onlineOrders.map((o) => ({
        id: o.id,
        date: o.createdAt || o.orderDate,
        itemsCount: (o.items || []).length || 1,
        items: o.items || [],
        source: 'Website',
        total: o.grandTotal,
        paymentMethod: o.paymentMethod || 'Razorpay / Online',
        paymentStatus: o.paymentStatus || 'Paid',
        status: o.orderStatus || o.status || 'Processing',
        rawOrder: o,
      })),
      ...posBills.map((b) => ({
        id: b.id,
        date: b.createdAt,
        itemsCount: (b.items || []).length || 1,
        items: b.items || [],
        source: 'Store / POS',
        total: b.grandTotal,
        paymentMethod: b.paymentMethod || 'Cash',
        paymentStatus: b.paymentStatus || 'Paid',
        status: 'Completed',
        rawBill: b,
      })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Calculate metrics
    const completedOnline = onlineOrders.filter((o) => o.orderStatus !== 'Cancelled');
    const cancelledOrdersCount = onlineOrders.filter((o) => o.orderStatus === 'Cancelled').length;
    const totalOnlineSpent = completedOnline.reduce((sum, o) => sum + (Number(o.grandTotal) || 0), 0);
    const totalPosSpent = posBills.reduce((sum, b) => sum + (Number(b.grandTotal) || 0), 0);

    const totalOrdersCount = onlineOrders.length + posBills.length;
    const completedOrdersCount = completedOnline.length + posBills.length;
    const totalSpentSum = totalOnlineSpent + totalPosSpent;
    const avgOrderValue = completedOrdersCount > 0 ? Math.round(totalSpentSum / completedOrdersCount) : 0;

    const allDates = combinedHistory.map((h) => new Date(h.date)).filter((d) => !isNaN(d.getTime()));
    allDates.sort((a, b) => a - b); // Ascending

    const firstPurchase = allDates.length > 0 ? allDates[0].toISOString() : null;
    const lastPurchase = allDates.length > 0 ? allDates[allDates.length - 1].toISOString() : null;

    // Timeline events
    const timeline = [
      {
        id: `t-created`,
        time: user.createdAt,
        type: 'account_created',
        title: 'Customer account created',
        detail: `Source: ${user.source || 'Website'}`,
      },
      ...onlineOrders.map((o) => ({
        id: `t-ord-${o.id}`,
        time: o.createdAt || o.orderDate,
        type: 'online_order',
        title: `Website Order ${o.id} placed`,
        detail: `Amount: ₹${(o.grandTotal || 0).toLocaleString()} • Status: ${o.orderStatus || 'Processing'}`,
      })),
      ...posBills.map((b) => ({
        id: `t-pos-${b.id}`,
        time: b.createdAt,
        type: 'pos_purchase',
        title: `Physical Store POS Sale ${b.id} completed`,
        detail: `Amount: ₹${(b.grandTotal || 0).toLocaleString()} • Payment: ${b.paymentMethod}`,
      })),
    ].sort((a, b) => new Date(b.time) - new Date(a.time));

    // Cart data (if available on user record or empty)
    const cart = user.cart || null;

    const profileData = {
      ...user,
      totalOrders: totalOrdersCount,
      completedOrders: completedOrdersCount,
      cancelledOrders: cancelledOrdersCount,
      totalSpent: totalSpentSum,
      avgOrderValue: avgOrderValue,
      firstPurchase: firstPurchase,
      lastPurchase: lastPurchase,
      lastActive: lastPurchase || user.createdAt,
      cart: cart,
      orderHistory: combinedHistory,
      timeline: timeline,
    };

    return ApiResponse.success(res, profileData, 200);
  } catch (error) {
    return next(error);
  }
};

const createOrFindCustomer = async (req, res, next) => {
  try {
    const { name, mobile, email, source } = req.body;
    if (!mobile && !email) {
      return ApiResponse.error(res, 'Mobile number or email is required', 'VALIDATION_ERROR', 400);
    }

    const { user, created } = UserModel.findOrCreateByMobile({ name, mobile, email, source: source || 'POS' });
    return ApiResponse.success(
      res,
      user,
      created ? 201 : 200,
      { created, message: created ? 'New Customer created successfully' : 'Existing Customer selected' }
    );
  } catch (error) {
    return next(error);
  }
};

const updateCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = UserModel.updateUser(id, req.body);
    if (!updated) {
      return ApiResponse.error(res, 'Customer not found', 'NOT_FOUND', 404);
    }
    return ApiResponse.success(res, updated, 200);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  createOrFindCustomer,
  updateCustomer,
};
