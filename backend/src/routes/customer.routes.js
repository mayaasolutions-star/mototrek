const express = require('express');
const {
  getAllCustomers,
  getCustomerById,
  createOrFindCustomer,
  updateCustomer,
} = require('../controllers/customer.controller');

const router = express.Router();

router.get('/', getAllCustomers);
router.get('/:id', getCustomerById);
router.post('/', createOrFindCustomer);
router.put('/:id', updateCustomer);

module.exports = router;
