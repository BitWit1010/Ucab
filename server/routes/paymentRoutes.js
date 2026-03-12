const express = require('express');
const router = express.Router();
const { createPayment, getPaymentsByUser, getAllPayments } = require('../controllers/paymentController');
const { protect, authorizeRoles } = require('../middleware/auth');

router.use(protect);

router.post('/', createPayment);
router.get('/my', getPaymentsByUser);
router.get('/all', authorizeRoles('admin'), getAllPayments);

module.exports = router;
