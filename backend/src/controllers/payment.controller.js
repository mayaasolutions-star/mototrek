const PaymentModel = require('../models/payment.model');

const getAllPayments = (req, res, next) => {
  try {
    const payments = PaymentModel.getAllPayments();
    return res.status(200).json({
      success: true,
      data: payments,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllPayments,
};
