const express = require('express');
const { createOrder, getOrders, getOrderById, updateOrderStatus, updateOrderDetails } = require('../controllers/order.controller');

const router = express.Router();

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:id', getOrderById);
router.put('/:id', updateOrderDetails);
router.put('/:id/status', updateOrderStatus);

module.exports = router;
