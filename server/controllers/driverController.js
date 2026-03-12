const { drivers, users, populateUser, genId } = require('../mockData');

/**
 * @desc    Register as a driver (create driver profile)
 * @route   POST /api/drivers/register
 * @access  Private
 */
const registerDriver = async (req, res) => {
    try {
        const { vehicleType, vehicleModel, vehiclePlate, licenseNumber } = req.body;

        const existingDriver = drivers.find(d => d.userId === req.user._id);
        if (existingDriver) {
            return res.status(400).json({ message: 'Driver profile already exists' });
        }

        // Update user role
        const user = users.find(u => u._id === req.user._id);
        if (user) user.role = 'driver';

        const driver = {
            _id: genId('drv'),
            userId: req.user._id,
            vehicleType,
            vehicleModel,
            vehiclePlate,
            licenseNumber,
            rating: 4.5,
            totalRides: 0,
            isVerified: false,
            isAvailable: false,
            location: { lat: 28.6139, lng: 77.2090 },
            createdAt: new Date()
        };
        drivers.push(driver);

        res.status(201).json(driver);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

/**
 * @desc    Get all verified drivers
 * @route   GET /api/drivers
 * @access  Public
 */
const getDrivers = async (req, res) => {
    try {
        const result = drivers
            .filter(d => d.isVerified)
            .map(d => ({ ...d, userId: populateUser(d.userId, 'name email phone') }));
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

/**
 * @desc    Get nearby available drivers
 * @route   GET /api/drivers/nearby
 * @access  Private
 */
const getNearbyDrivers = async (req, res) => {
    try {
        const result = drivers
            .filter(d => d.isAvailable && d.isVerified)
            .slice(0, 10)
            .map(d => ({ ...d, userId: populateUser(d.userId, 'name phone') }));
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

/**
 * @desc    Verify a driver (admin only)
 * @route   PUT /api/drivers/:id/verify
 * @access  Private (Admin)
 */
const verifyDriver = async (req, res) => {
    try {
        const driver = drivers.find(d => d._id === req.params.id);
        if (!driver) {
            return res.status(404).json({ message: 'Driver not found' });
        }
        driver.isVerified = true;
        res.json({ message: 'Driver verified successfully', driver });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

/**
 * @desc    Toggle driver availability
 * @route   PUT /api/drivers/toggle-availability
 * @access  Private (Driver)
 */
const toggleAvailability = async (req, res) => {
    try {
        const driver = drivers.find(d => d.userId === req.user._id);
        if (!driver) {
            return res.status(404).json({ message: 'Driver profile not found' });
        }
        driver.isAvailable = !driver.isAvailable;
        res.json({ message: `Driver is now ${driver.isAvailable ? 'available' : 'offline'}`, driver });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

/**
 * @desc    Get driver profile for logged-in driver
 * @route   GET /api/drivers/profile
 * @access  Private (Driver)
 */
const getDriverProfile = async (req, res) => {
    try {
        const driver = drivers.find(d => d.userId === req.user._id);
        if (!driver) {
            return res.status(404).json({ message: 'Driver profile not found' });
        }
        res.json({ ...driver, userId: populateUser(driver.userId, 'name email phone') });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { registerDriver, getDrivers, getNearbyDrivers, verifyDriver, toggleAvailability, getDriverProfile };
