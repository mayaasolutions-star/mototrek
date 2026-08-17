const CouponModel = require('../models/coupon.model');

const getAllCoupons = (req, res, next) => {
  try {
    const coupons = CouponModel.getAllCoupons();
    return res.status(200).json({
      success: true,
      data: coupons,
    });
  } catch (error) {
    return next(error);
  }
};

const validateCoupon = (req, res, next) => {
  try {
    const { code, cartSubtotal = 0 } = req.body;
    const coupon = CouponModel.findByCode(code);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        error: { message: 'Invalid or expired coupon code' },
      });
    }

    if (coupon.status !== 'Active') {
      return res.status(400).json({
        success: false,
        error: { message: 'This coupon has expired or is inactive' },
      });
    }

    if (cartSubtotal < coupon.minOrder) {
      return res.status(400).json({
        success: false,
        error: { message: `Minimum order amount of ₹${coupon.minOrder.toLocaleString()} required for this coupon` },
      });
    }

    let discountAmount = 0;
    if (coupon.type === 'Percentage') {
      discountAmount = Math.round((cartSubtotal * coupon.discount) / 100);
    } else {
      discountAmount = coupon.discount;
    }

    return res.status(200).json({
      success: true,
      data: {
        code: coupon.code,
        discountType: coupon.type,
        discountValue: coupon.discount,
        discountAmount,
      },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllCoupons,
  validateCoupon,
};
