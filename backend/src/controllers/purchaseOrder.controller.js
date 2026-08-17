const ApiResponse = require('../utils/apiResponse');
const PurchaseOrderModel = require('../models/purchaseOrder.model');

const getAllPurchaseOrders = async (req, res, next) => {
  try {
    const pos = PurchaseOrderModel.getAllPurchaseOrders();
    return ApiResponse.success(res, pos, 200, { total: pos.length });
  } catch (error) {
    return next(error);
  }
};

const createPurchaseOrder = async (req, res, next) => {
  try {
    const { supplierName, items } = req.body;
    if (!supplierName || !items || !items.length) {
      return ApiResponse.error(res, 'Supplier and purchase items are required.', 'VALIDATION_ERROR', 400);
    }
    const po = PurchaseOrderModel.createPurchaseOrder(req.body);
    return ApiResponse.success(res, po, 201);
  } catch (error) {
    return next(error);
  }
};

const markPOReceived = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { adminName } = req.body;
    const po = PurchaseOrderModel.markPOReceived(id, adminName);
    if (!po) {
      return ApiResponse.error(res, 'Purchase order not found.', 'NOT_FOUND', 404);
    }
    return ApiResponse.success(res, po, 200);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllPurchaseOrders,
  createPurchaseOrder,
  markPOReceived,
};
