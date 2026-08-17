const express = require('express');
const { getAllShipments } = require('../controllers/shipping.controller');

const router = express.Router();

router.get('/', getAllShipments);

module.exports = router;
