const ApiResponse = require('../utils/apiResponse');
const SupplierModel = require('../models/supplier.model');

const getAllSuppliers = async (req, res, next) => {
  try {
    const suppliers = SupplierModel.getAllSuppliers();
    return ApiResponse.success(res, suppliers, 200, { total: suppliers.length });
  } catch (error) {
    return next(error);
  }
};

const createSupplier = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return ApiResponse.error(res, 'Supplier name is required.', 'VALIDATION_ERROR', 400);
    }
    const created = SupplierModel.createSupplier(req.body);
    return ApiResponse.success(res, created, 201);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllSuppliers,
  createSupplier,
};
