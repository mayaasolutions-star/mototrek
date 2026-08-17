const ShippingModel = require('../models/shipping.model');

const getAllShipments = (req, res, next) => {
  try {
    const shipments = ShippingModel.getAllShipments();
    return res.status(200).json({
      success: true,
      data: shipments,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllShipments,
};
