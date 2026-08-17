const ApiResponse = require('../utils/apiResponse');
const PosBillModel = require('../models/posBill.model');

const getAllPosBills = async (req, res, next) => {
  try {
    const bills = PosBillModel.getAllPosBills();
    return ApiResponse.success(res, bills, 200, { total: bills.length });
  } catch (error) {
    return next(error);
  }
};

const getPosBillById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bill = PosBillModel.getPosBillById(id);
    if (!bill) {
      return ApiResponse.error(res, 'POS Bill not found.', 'NOT_FOUND', 404);
    }
    return ApiResponse.success(res, bill, 200);
  } catch (error) {
    return next(error);
  }
};

const createPosBill = async (req, res, next) => {
  try {
    const { items, grandTotal } = req.body;
    if (!items || !items.length) {
      return ApiResponse.error(res, 'At least one item is required for POS bill.', 'VALIDATION_ERROR', 400);
    }

    const createdBill = PosBillModel.createPosBill(req.body);
    return ApiResponse.success(res, createdBill, 201);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllPosBills,
  getPosBillById,
  createPosBill,
};
