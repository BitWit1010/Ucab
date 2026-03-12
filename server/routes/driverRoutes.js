const express = require('express');
const router = express.Router();
const { registerDriver, getDrivers, getNearbyDrivers, verifyDriver, toggleAvailability, getDriverProfile } = require('../controllers/driverController');
const { protect, authorizeRoles } = require('../middleware/auth');

// Public route
router.get('/', getDrivers);

// Protected routes
router.post('/register', protect, registerDriver);
router.get('/nearby', protect, getNearbyDrivers);
router.get('/profile', protect, getDriverProfile);
router.put('/toggle-availability', protect, toggleAvailability);

// Admin only
router.put('/:id/verify', protect, authorizeRoles('admin'), verifyDriver);

module.exports = router;
