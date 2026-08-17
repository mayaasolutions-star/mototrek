/**
 * POS Bill Model
 * Stores physical store POS sales transactions.
 */

let posBills = [];

const seedPosBills = (initialBills) => {
  posBills = [...initialBills];
};

const getAllPosBills = () => {
  return posBills.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

const getPosBillById = (id) => {
  return posBills.find((b) => b.id === id);
};

const createPosBill = (billData) => {
  const ProductModel = require('./product.model');
  const UserModel = require('./user.model');
  const AccountsModel = require('./accounts.model');

  const nextSeq = (posBills.length + 1).toString().padStart(5, '0');
  const newBillId = billData.billNo || billData.id || `MTK-POS-${nextSeq}`;
  const newBill = {
    id: newBillId,
    customerId: billData.customerId || 'walk-in',
    customerName: billData.customerName || 'Walk-in Customer',
    email: billData.email || '',
    mobile: billData.mobile || '',
    items: billData.items || [],
    subtotal: Number(billData.subtotal) || 0,
    discount: Number(billData.discount) || 0,
    tax: Number(billData.tax) || 0,
    grandTotal: Number(billData.grandTotal) || 0,
    paymentMethod: billData.paymentMethod || 'Cash',
    paymentStatus: 'Paid',
    staffName: billData.staffName || 'Pratik M. (Store Staff)',
    createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
  };

  // 1. Decrement Stock for each item SKU
  newBill.items.forEach((item) => {
    if (item.sku) {
      ProductModel.adjustStock(item.sku, -Math.abs(item.quantity || 1), 'Offline POS Sale', newBill.staffName);
    }
  });

  // 2. Feed Income Transaction to Accounts
  AccountsModel.addTransaction({
    reference: newBill.id,
    type: 'Offline Sale',
    description: `Store POS Bill for ${newBill.customerName}`,
    income: newBill.grandTotal,
    expense: 0,
    paymentMethod: newBill.paymentMethod,
    source: 'Physical Store POS',
  });

  posBills.unshift(newBill);
  return newBill;
};

module.exports = {
  seedPosBills,
  getAllPosBills,
  getPosBillById,
  createPosBill,
};
