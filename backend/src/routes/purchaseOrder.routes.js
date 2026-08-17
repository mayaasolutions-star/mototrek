const express = require('express');
const { getAllPurchaseOrders, createPurchaseOrder, markPOReceived } = require('../controllers/purchaseOrder.controller');

const router = express.Router();

router.get('/', getAllPurchaseOrders);
router.post('/', createPurchaseOrder);
router.put('/:id/receive', markPOReceived);

module.exports = router;
