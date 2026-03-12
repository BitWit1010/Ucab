const express = require('express');
const router = express.Router();
const { createRide, getFareEstimate, getUserRides, getRideById, updateRideStatus, getAllRides } = require('../controllers/rideController');
const { protect, authorizeRoles } = require('../middleware/auth');

// All ride routes are protected
router.use(protect);

router.post('/', createRide);
router.post('/estimate', getFareEstimate);
router.get('/my', getUserRides);
router.get('/all', authorizeRoles('admin'), getAllRides);
router.get('/:id', getRideById);
router.put('/:id/status', updateRideStatus);

module.exports = router;
