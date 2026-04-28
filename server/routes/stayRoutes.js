const express = require('express');
const router = express.Router();
const { getStays, getStayById } = require('../controllers/stayController');

router.get('/', getStays);
router.get('/:id', getStayById);

module.exports = router;
