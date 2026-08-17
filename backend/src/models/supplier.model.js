/**
 * Supplier Model
 * Manages official riding gear distributors & manufacturer suppliers.
 */

let suppliers = [];

const seedSuppliers = (initialSuppliers) => {
  suppliers = [...initialSuppliers];
};

const getAllSuppliers = () => {
  return suppliers;
};

const getSupplierById = (id) => {
  return suppliers.find((s) => s.id === id);
};

const createSupplier = (data) => {
  const newSupplier = {
    id: `sup-${100 + suppliers.length + 1}`,
    name: data.name,
    companyName: data.companyName || data.name,
    contactPerson: data.contactPerson || 'Account Manager',
    phone: data.phone || '+91 98765 00000',
    email: data.email || 'orders@supplier.in',
    address: data.address || 'Mumbai, Maharashtra',
    gstin: data.gstin || '27AAAAA0000A1Z5',
    status: 'Active',
    createdAt: new Date().toISOString().slice(0, 10),
  };
  suppliers.push(newSupplier);
  return newSupplier;
};

module.exports = {
  seedSuppliers,
  getAllSuppliers,
  getSupplierById,
  createSupplier,
};
