/**
 * Master REST API Router (/api/v1)
 * Mounts all sub-domain routes under clean versioned namespaces.
 */

const express = require('express');
const healthRoutes = require('./health.routes');
const authRoutes = require('./auth.routes');
const productRoutes = require('./product.routes');
const orderRoutes = require('./order.routes');
const analyticsRoutes = require('./analytics.routes');
const customerRoutes = require('./customer.routes');
const couponRoutes = require('./coupon.routes');
const paymentRoutes = require('./payment.routes');
const shippingRoutes = require('./shipping.routes');
const posBillRoutes = require('./posBill.routes');
const supplierRoutes = require('./supplier.routes');
const purchaseOrderRoutes = require('./purchaseOrder.routes');
const accountsRoutes = require('./accounts.routes');

const { getCategories, addCategory, getBrands, addBrand } = require('../controllers/product.controller');

const router = express.Router();

// Health Check
router.use('/health', healthRoutes);

// Feature Route Namespaces
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/customers', customerRoutes);
router.use('/coupons', couponRoutes);
router.use('/payments', paymentRoutes);
router.use('/shipping', shippingRoutes);
router.use('/pos', posBillRoutes);
router.use('/suppliers', supplierRoutes);
router.use('/purchases', purchaseOrderRoutes);
router.use('/accounts', accountsRoutes);

// Categories & Brands
router.get('/categories', getCategories);
router.post('/categories', addCategory);
router.get('/brands', getBrands);
router.post('/brands', addBrand);

module.exports = router;
