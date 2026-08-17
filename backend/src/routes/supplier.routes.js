const express = require('express');
const { getAllSuppliers, createSupplier } = require('../controllers/supplier.controller');

const router = express.Router();

router.get('/', getAllSuppliers);
router.post('/', createSupplier);

module.exports = router;
