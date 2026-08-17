const express = require('express');
const { getAllPosBills, getPosBillById, createPosBill } = require('../controllers/posBill.controller');

const router = express.Router();

router.get('/', getAllPosBills);
router.get('/:id', getPosBillById);
router.post('/', createPosBill);

module.exports = router;
