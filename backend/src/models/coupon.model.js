/**
 * Coupon & Promo Code Database Model
 */

let COUPONS_DB = [
  {
    id: 'c-101',
    code: 'MOTOTREK10',
    type: 'Percentage',
    discount: 10,
    minOrder: 3000,
    usageLimit: 500,
    timesUsed: 48,
    status: 'Active',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
  },
  {
    id: 'c-102',
    code: 'PUNE200',
    type: 'Fixed',
    discount: 200,
    minOrder: 2000,
    usageLimit: 200,
    timesUsed: 95,
    status: 'Active',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
  },
  {
    id: 'c-103',
    code: 'RIDE500',
    type: 'Fixed',
    discount: 500,
    minOrder: 5000,
    usageLimit: 100,
    timesUsed: 34,
    status: 'Active',
    startDate: '2026-02-01',
    endDate: '2026-12-31',
  },
  {
    id: 'c-104',
    code: 'WELCOME10',
    type: 'Percentage',
    discount: 10,
    minOrder: 1500,
    usageLimit: 1000,
    timesUsed: 120,
    status: 'Active',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
  },
  {
    id: 'c-105',
    code: 'GEAR15',
    type: 'Percentage',
    discount: 15,
    minOrder: 6000,
    usageLimit: 50,
    timesUsed: 18,
    status: 'Active',
    startDate: '2026-03-01',
    endDate: '2026-12-31',
  },
  {
    id: 'c-106',
    code: 'SUMMER20',
    type: 'Percentage',
    discount: 20,
    minOrder: 4000,
    usageLimit: 50,
    timesUsed: 50,
    status: 'Expired',
    startDate: '2026-04-01',
    endDate: '2026-06-30',
  },
];

class CouponModel {
  static getAllCoupons() {
    return [...COUPONS_DB];
  }

  static findByCode(code) {
    if (!code) return null;
    return COUPONS_DB.find((c) => c.code.toUpperCase() === code.toUpperCase()) || null;
  }

  static seedCoupons(dataList) {
    COUPONS_DB = [...dataList];
    return COUPONS_DB;
  }
}

module.exports = CouponModel;
