/**
 * Purchase Order Model
 * Handles stock purchases from suppliers. Received POs increase shared inventory.
 */

let purchaseOrders = [];

const seedPurchaseOrders = (initialPOs) => {
  purchaseOrders = [...initialPOs];
};

const getAllPurchaseOrders = () => {
  return purchaseOrders.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
};

const getPurchaseOrderById = (id) => {
  return purchaseOrders.find((po) => po.id === id);
};

const createPurchaseOrder = (data) => {
  const newPO = {
    id: `PI-${1000 + purchaseOrders.length + 1}`,
    supplierId: data.supplierId,
    supplierName: data.supplierName || 'Supplier',
    purchaseDate: data.purchaseDate || new Date().toISOString().slice(0, 10),
    items: data.items || [],
    subtotalCost: Number(data.subtotalCost) || 0,
    taxCost: Number(data.taxCost) || 0,
    totalPurchaseCost: Number(data.totalPurchaseCost) || 0,
    paymentStatus: data.paymentStatus || 'Pending',
    status: data.status || 'Ordered',
    notes: data.notes || '',
    createdAt: new Date().toISOString(),
  };

  purchaseOrders.unshift(newPO);

  // If created directly in Received status, receive stock immediately
  if (newPO.status === 'Received') {
    markPOReceived(newPO.id);
  }

  return newPO;
};

const markPOReceived = (id, adminName = 'Pratik M.') => {
  const ProductModel = require('./product.model');
  const AccountsModel = require('./accounts.model');

  const po = purchaseOrders.find((p) => p.id === id);
  if (!po || po.status === 'Received') return po;

  po.status = 'Received';
  po.receivedAt = new Date().toISOString().replace('T', ' ').slice(0, 19);

  // 1. Increase inventory stock for each item SKU
  po.items.forEach((item) => {
    if (item.sku) {
      ProductModel.adjustStock(item.sku, Math.abs(item.quantity || 1), `Purchase Receipt ${po.id}`, adminName);
    }
  });

  // 2. Feed Purchase Expense to Accounts
  AccountsModel.addTransaction({
    reference: po.id,
    type: 'Stock Purchase',
    description: `Supplier Stock Purchase PO from ${po.supplierName}`,
    income: 0,
    expense: po.totalPurchaseCost,
    paymentMethod: 'Bank Transfer',
    source: 'Suppliers & Purchases',
  });

  return po;
};

module.exports = {
  seedPurchaseOrders,
  getAllPurchaseOrders,
  getPurchaseOrderById,
  createPurchaseOrder,
  markPOReceived,
};
