/**
 * Shipping & AWB Logistics Database Model
 */

let SHIPMENTS_DB = [];

class ShippingModel {
  static getAllShipments() {
    return [...SHIPMENTS_DB];
  }

  static seedShipments(dataList) {
    SHIPMENTS_DB = [...dataList];
    return SHIPMENTS_DB;
  }

  static addShipment(shipmentData) {
    SHIPMENTS_DB.unshift(shipmentData);
    return shipmentData;
  }
}

module.exports = ShippingModel;
