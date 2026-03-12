const { users, drivers, rides, payments, populateUser } = require('../mockData');

/**
 * @desc    Get dashboard stats for admin
 * @route   GET /api/admin/stats
 * @access  Private (Admin)
 */
const getStats = async (req, res) => {
    try {
        const totalUsers = users.filter(u => u.role === 'user').length;
        const totalDrivers = drivers.length;
        const totalRides = rides.length;
        const completedRides = rides.filter(r => r.status === 'completed').length;
        const totalRevenue = payments
            .filter(p => p.status === 'completed')
            .reduce((sum, p) => sum + p.amount, 0);
        const pendingVerifications = drivers.filter(d => !d.isVerified).length;

        res.json({
            totalUsers,
            totalDrivers,
            totalRides,
            completedRides,
            totalRevenue,
            pendingVerifications
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

/**
 * @desc    Get all users (admin)
 * @route   GET /api/admin/users
 * @access  Private (Admin)
 */
const getAllUsers = async (req, res) => {
    try {
        const safeUsers = users
            .map(({ password, ...rest }) => rest)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.json(safeUsers);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

/**
 * @desc    Get all drivers with user info (admin)
 * @route   GET /api/admin/drivers
 * @access  Private (Admin)
 */
const getAllDrivers = async (req, res) => {
    try {
        const result = drivers
            .map(d => ({ ...d, userId: populateUser(d.userId, 'name email phone') }))
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getStats, getAllUsers, getAllDrivers };
