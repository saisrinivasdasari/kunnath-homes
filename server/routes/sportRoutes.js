const express = require('express');
const router = express.Router();
const { getSports, getSportById } = require('../controllers/sportController');

router.route('/').get(getSports);
router.route('/:id').get(getSportById);

module.exports = router;
