/**
 * Payment Transactions Database Model
 */

let PAYMENTS_DB = [];

class PaymentModel {
  static getAllPayments() {
    return [...PAYMENTS_DB];
  }

  static seedPayments(dataList) {
    PAYMENTS_DB = [...dataList];
    return PAYMENTS_DB;
  }

  static addPayment(paymentData) {
    PAYMENTS_DB.unshift(paymentData);
    return paymentData;
  }
}

module.exports = PaymentModel;
