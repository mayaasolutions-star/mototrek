/**
 * Product Controller
 * Handles Public Product Listing, Product Detail, Category/Brand management, and Admin Product CRUD.
 */

const ApiResponse = require('../utils/apiResponse');
const ProductModel = require('../models/product.model');

// Public List: Returns Active & Visible Products sorted with Newest First (Internal fields omitted)
const getPublicProducts = async (req, res, next) => {
  try {
    const { category, brand, search, sort = 'newest' } = req.query;
    const products = ProductModel.getAllProducts({
      category,
      brand,
      search,
      status: 'Active',
      visibility: 'Visible',
      sort,
    }).map(p => {
      const { costPrice, marginPercent, supplier, supplierSku, purchaseCost, internalNotes, ...publicData } = p;
      return publicData;
    });

    return ApiResponse.success(res, products, 200, { total: products.length });
  } catch (error) {
    return next(error);
  }
};

// Admin List: Returns All Products with complete internal data
const getAdminProducts = async (req, res, next) => {
  try {
    const { category, brand, search, status, visibility, sort = 'newest' } = req.query;
    const products = ProductModel.getAllProducts({
      category,
      brand,
      search,
      status,
      visibility,
      sort,
    });
    return ApiResponse.success(res, products, 200, { total: products.length });
  } catch (error) {
    return next(error);
  }
};

// Public Product Detail by Slug
const getProductBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const product = ProductModel.getPublicProductBySlug(slug);
    if (!product) {
      return ApiResponse.error(res, 'Product not found.', 'PRODUCT_NOT_FOUND', 404);
    }
    return ApiResponse.success(res, product, 200);
  } catch (error) {
    return next(error);
  }
};

// Admin Product Detail by ID
const getAdminProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = ProductModel.getProductById(id);
    if (!product) {
      return ApiResponse.error(res, 'Product not found.', 'PRODUCT_NOT_FOUND', 404);
    }
    return ApiResponse.success(res, product, 200);
  } catch (error) {
    return next(error);
  }
};

// Create New Product
const createProduct = async (req, res, next) => {
  try {
    const { name, price, mrp } = req.body;
    if (!name || name.trim() === '') {
      return ApiResponse.error(res, 'Product name is required.', 'VALIDATION_ERROR', 400);
    }
    if (!price || Number(price) <= 0) {
      return ApiResponse.error(res, 'Valid product selling price is required.', 'VALIDATION_ERROR', 400);
    }

    const createdProduct = ProductModel.createProduct(req.body);
    return ApiResponse.success(res, createdProduct, 201);
  } catch (error) {
    return next(error);
  }
};

// Update Product
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = ProductModel.updateProduct(id, req.body);
    if (!updated) {
      return ApiResponse.error(res, 'Product not found for update.', 'NOT_FOUND', 404);
    }
    return ApiResponse.success(res, updated, 200);
  } catch (error) {
    return next(error);
  }
};

// Duplicate Product
const duplicateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const duplicated = ProductModel.duplicateProduct(id);
    if (!duplicated) {
      return ApiResponse.error(res, 'Original product not found for duplication.', 'NOT_FOUND', 404);
    }
    return ApiResponse.success(res, duplicated, 201);
  } catch (error) {
    return next(error);
  }
};

// Adjust Variant Stock
const adjustStock = async (req, res, next) => {
  try {
    const { variantId, adjustment, reason, adminName } = req.body;
    if (!variantId || adjustment === undefined) {
      return ApiResponse.error(res, 'variantId and adjustment count are required.', 'VALIDATION_ERROR', 400);
    }

    const result = ProductModel.adjustStock(variantId, adjustment, reason, adminName);
    if (!result) {
      return ApiResponse.error(res, 'Variant not found for stock adjustment.', 'NOT_FOUND', 404);
    }
    return ApiResponse.success(res, result, 200);
  } catch (error) {
    return next(error);
  }
};

// Categories & Brands
const getCategories = async (req, res, next) => {
  try {
    const categories = ProductModel.getCategories();
    const subcategories = ProductModel.getSubcategories();
    return ApiResponse.success(res, { categories, subcategories }, 200);
  } catch (error) {
    return next(error);
  }
};

const addCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) return ApiResponse.error(res, 'Category name is required.', 'VALIDATION_ERROR', 400);
    const categories = ProductModel.addCategory(name.trim());
    return ApiResponse.success(res, categories, 201);
  } catch (error) {
    return next(error);
  }
};

const getBrands = async (req, res, next) => {
  try {
    const brands = ProductModel.getBrands();
    return ApiResponse.success(res, brands, 200);
  } catch (error) {
    return next(error);
  }
};

const addBrand = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) return ApiResponse.error(res, 'Brand name is required.', 'VALIDATION_ERROR', 400);
    const brands = ProductModel.addBrand(name.trim());
    return ApiResponse.success(res, brands, 201);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getPublicProducts,
  getAdminProducts,
  getProductBySlug,
  getAdminProductById,
  createProduct,
  updateProduct,
  duplicateProduct,
  adjustStock,
  getCategories,
  addCategory,
  getBrands,
  addBrand,
};
