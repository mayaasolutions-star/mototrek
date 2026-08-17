const express = require('express');
const {
  getPublicProducts,
  getAdminProducts,
  getProductBySlug,
  getAdminProductById,
  createProduct,
  updateProduct,
  duplicateProduct,
  adjustStock,
  getCategories,
  getBrands,
} = require('../controllers/product.controller');

const router = express.Router();

// Public Endpoints
router.get('/', getPublicProducts);
router.get('/detail/:slug', getProductBySlug);

// Admin Endpoints
router.get('/admin/all', getAdminProducts);
router.get('/admin/id/:id', getAdminProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.post('/:id/duplicate', duplicateProduct);
router.post('/inventory/adjust', adjustStock);

module.exports = router;
