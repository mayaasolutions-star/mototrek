const ApiResponse = require('../utils/apiResponse');
const AccountsModel = require('../models/accounts.model');

const getAccountsSummary = async (req, res, next) => {
  try {
    const summary = AccountsModel.getFinancialSummary();
    const transactions = AccountsModel.getAllTransactions();
    return ApiResponse.success(res, { summary, transactions }, 200);
  } catch (error) {
    return next(error);
  }
};

const addExpense = async (req, res, next) => {
  try {
    const { description, amount } = req.body;
    if (!description || !amount) {
      return ApiResponse.error(res, 'Description and amount are required.', 'VALIDATION_ERROR', 400);
    }
    const trans = AccountsModel.addTransaction({
      reference: `EXP-${Date.now().toString().slice(-4)}`,
      type: 'Operating Expense',
      description,
      income: 0,
      expense: Number(amount),
      paymentMethod: req.body.paymentMethod || 'Bank Transfer',
      source: 'Accounts',
    });
    return ApiResponse.success(res, trans, 201);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAccountsSummary,
  addExpense,
};
