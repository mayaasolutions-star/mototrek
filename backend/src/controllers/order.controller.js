const OrderModel = require('../models/order.model');

async function createOrder(req, res) {
  try {
    const orderData = req.body;
    if (!orderData.items || orderData.items.length === 0) {
      return res.status(400).json({ success: false, error: { message: 'Order items required' } });
    }
    const order = await OrderModel.createOrder(orderData);
    return res.status(201).json({ success: true, data: order });
  } catch (err) {
    return res.status(500).json({ success: false, error: { message: err.message } });
  }
}

async function getOrders(req, res) {
  try {
    const { customerId, status } = req.query;
    const orders = await OrderModel.findAll({ customerId, status });
    return res.status(200).json({ success: true, data: orders });
  } catch (err) {
    return res.status(500).json({ success: false, error: { message: err.message } });
  }
}

async function getOrderById(req, res) {
  try {
    const { id } = req.params;
    const order = await OrderModel.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, error: { message: 'Order not found' } });
    }
    return res.status(200).json({ success: true, data: order });
  } catch (err) {
    return res.status(500).json({ success: false, error: { message: err.message } });
  }
}

async function updateOrderStatus(req, res) {
  try {
    const { id } = req.params;
    const { status, adminName } = req.body;
    const order = await OrderModel.updateStatus(id, status, adminName);
    if (!order) {
      return res.status(404).json({ success: false, error: { message: 'Order not found' } });
    }
    return res.status(200).json({ success: true, data: order });
  } catch (err) {
    return res.status(500).json({ success: false, error: { message: err.message } });
  }
}

async function updateOrderDetails(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const adminName = req.body.adminName || 'Admin';
    const order = await OrderModel.updateOrder(id, updates, adminName);
    if (!order) {
      return res.status(404).json({ success: false, error: { message: 'Order not found' } });
    }
    return res.status(200).json({ success: true, data: order });
  } catch (err) {
    return res.status(500).json({ success: false, error: { message: err.message } });
  }
}

module.exports = { createOrder, getOrders, getOrderById, updateOrderStatus, updateOrderDetails };
