/**
 * Shipping Service Boundary (Courier Provider Abstraction)
 */

class ShippingService {
  /**
   * Calculate Shipping Cost & Delivery Time
   */
  async calculateShipping(pincode, weight) {
    throw new Error('calculateShipping not implemented');
  }

  /**
   * Create Courier Shipment & Generate AWB
   */
  async createShipment(orderData) {
    throw new Error('createShipment not implemented');
  }

  /**
   * Get Live Tracking Events
   */
  async getTracking(awbNumber) {
    throw new Error('getTracking not implemented');
  }
}

module.exports = new ShippingService();
