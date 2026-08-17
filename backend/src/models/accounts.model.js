/**
 * Accounts Model
 * Manages financial transactions, income from sales, supplier purchase costs, and operating expenses.
 */

let transactions = [];

const seedTransactions = (initialTransactions) => {
  transactions = [...initialTransactions];
};

const getAllTransactions = () => {
  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
};

const addTransaction = (data) => {
  const newTrans = {
    id: `TRANS-${1000 + transactions.length + 1}`,
    date: data.date || new Date().toISOString().replace('T', ' ').slice(0, 19),
    reference: data.reference || 'N/A',
    type: data.type || 'Operating Expense', // 'Online Sale' | 'Offline Sale' | 'Stock Purchase' | 'Operating Expense'
    description: data.description || '',
    income: Number(data.income) || 0,
    expense: Number(data.expense) || 0,
    paymentMethod: data.paymentMethod || 'Cash',
    source: data.source || 'Accounts',
  };
  transactions.unshift(newTrans);
  return newTrans;
};

const getFinancialSummary = () => {
  const totalIncome = transactions.reduce((sum, t) => sum + (t.income || 0), 0);
  const totalExpenses = transactions.reduce((sum, t) => sum + (t.expense || 0), 0);
  const netCash = totalIncome - totalExpenses;

  const onlineSalesRevenue = transactions
    .filter((t) => t.type === 'Online Sale')
    .reduce((sum, t) => sum + (t.income || 0), 0);

  const offlineSalesRevenue = transactions
    .filter((t) => t.type === 'Offline Sale')
    .reduce((sum, t) => sum + (t.income || 0), 0);

  const totalStockPurchases = transactions
    .filter((t) => t.type === 'Stock Purchase')
    .reduce((sum, t) => sum + (t.expense || 0), 0);

  const totalOperatingExpenses = transactions
    .filter((t) => t.type === 'Operating Expense')
    .reduce((sum, t) => sum + (t.expense || 0), 0);

  return {
    totalIncome,
    totalExpenses,
    netCash,
    onlineSalesRevenue,
    offlineSalesRevenue,
    totalSalesRevenue: onlineSalesRevenue + offlineSalesRevenue,
    totalStockPurchases,
    totalOperatingExpenses,
    transactionCount: transactions.length,
  };
};

module.exports = {
  seedTransactions,
  getAllTransactions,
  addTransaction,
  getFinancialSummary,
};
