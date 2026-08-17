/**
 * Payment Service Boundary (Cashfree / Razorpay Gateway Abstraction)
 */

class PaymentService {
  /**
   * Create Gateway Payment Session
   */
  async createPayment(orderData) {
    throw new Error('createPayment not implemented');
  }

  /**
   * Verify Gateway Signature / Payment Status
   */
  async verifyPayment(paymentDetails) {
    throw new Error('verifyPayment not implemented');
  }

  /**
   * Handle Payment Webhook Signal (/api/v1/payments/webhook)
   */
  async handleWebhook(payload, signature) {
    throw new Error('handleWebhook not implemented');
  }

  /**
   * Initiate Order Refund
   */
  async refundPayment(orderId, amount) {
    throw new Error('refundPayment not implemented');
  }
}

module.exports = new PaymentService();
