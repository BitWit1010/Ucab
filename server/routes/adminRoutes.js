const express = require('express');
const router = express.Router();
const { getStats, getAllUsers, getAllDrivers } = require('../controllers/adminController');
const { protect, authorizeRoles } = require('../middleware/auth');

// All admin routes require authentication and admin role
router.use(protect, authorizeRoles('admin'));

router.get('/stats', getStats);
router.get('/users', getAllUsers);
router.get('/drivers', getAllDrivers);

module.exports = router;
