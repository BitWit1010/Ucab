const { rides, populateDriver, populateUser, genId } = require('../mockData');
const { calculateFare, calculateDistance } = require('../utils/fareCalculator');

/**
 * @desc    Create a new ride booking
 * @route   POST /api/rides
 * @access  Private (User)
 */
const createRide = async (req, res) => {
    try {
        const { pickup, drop, vehicleType, couponCode } = req.body;

        const distance = calculateDistance(
            pickup.lat || 28.6139, pickup.lng || 77.2090,
            drop.lat || 28.5355, drop.lng || 77.3910
        );

        const fareDetails = calculateFare(distance, vehicleType, couponCode);

        const ride = {
            _id: genId('ride'),
            userId: req.user._id,
            driverId: null,
            pickup,
            drop,
            vehicleType,
            distance: fareDetails.distance,
            fare: fareDetails.total,
            status: 'requested',
            couponCode: couponCode || '',
            discount: fareDetails.discount,
            createdAt: new Date(),
            completedAt: null
        };
        rides.push(ride);

        res.status(201).json({ ride, fareDetails });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

/**
 * @desc    Get fare estimate without booking
 * @route   POST /api/rides/estimate
 * @access  Private
 */
const getFareEstimate = async (req, res) => {
    try {
        const { pickup, drop, vehicleType, couponCode } = req.body;

        const distance = calculateDistance(
            pickup.lat || 28.6139, pickup.lng || 77.2090,
            drop.lat || 28.5355, drop.lng || 77.3910
        );

        const fareDetails = calculateFare(distance, vehicleType, couponCode);
        res.json(fareDetails);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

/**
 * @desc    Get all rides for the logged-in user
 * @route   GET /api/rides/my
 * @access  Private
 */
const getUserRides = async (req, res) => {
    try {
        const userRides = rides
            .filter(r => r.userId === req.user._id)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map(r => ({
                ...r,
                driverId: r.driverId ? populateDriver(r.driverId) : null
            }));
        res.json(userRides);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

/**
 * @desc    Get ride by ID
 * @route   GET /api/rides/:id
 * @access  Private
 */
const getRideById = async (req, res) => {
    try {
        const ride = rides.find(r => r._id === req.params.id);
        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }
        res.json({
            ...ride,
            driverId: ride.driverId ? populateDriver(ride.driverId) : null,
            userId: populateUser(ride.userId, 'name email phone')
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

/**
 * @desc    Update ride status
 * @route   PUT /api/rides/:id/status
 * @access  Private
 */
const updateRideStatus = async (req, res) => {
    try {
        const { status, driverId } = req.body;
        const ride = rides.find(r => r._id === req.params.id);
        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }
        ride.status = status;
        if (driverId) ride.driverId = driverId;
        if (status === 'completed') ride.completedAt = new Date();
        res.json(ride);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

/**
 * @desc    Get all rides (admin)
 * @route   GET /api/rides
 * @access  Private (Admin)
 */
const getAllRides = async (req, res) => {
    try {
        const allRides = rides
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map(r => ({
                ...r,
                userId: populateUser(r.userId, 'name email'),
                driverId: r.driverId ? populateDriver(r.driverId) : null
            }));
        res.json(allRides);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { createRide, getFareEstimate, getUserRides, getRideById, updateRideStatus, getAllRides };
