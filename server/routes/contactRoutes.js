const express = require('express');
const router = express.Router();
const { submitContactMessage } = require('../controllers/contactController');

router.route('/').post(submitContactMessage);

module.exports = router;
