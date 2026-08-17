const express = require('express');
const { getAccountsSummary, addExpense } = require('../controllers/accounts.controller');

const router = express.Router();

router.get('/', getAccountsSummary);
router.post('/expenses', addExpense);

module.exports = router;
