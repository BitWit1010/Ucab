const { payments, populateRide, genId } = require('../mockData');

/**
 * @desc    Create a payment for a ride
 * @route   POST /api/payments
 * @access  Private
 */
const createPayment = async (req, res) => {
    try {
        const { rideId, amount, method, donation, refreshments, couponDiscount } = req.body;

        const payment = {
            _id: genId('pay'),
            rideId,
            userId: req.user._id,
            amount,
            method: method || 'cash',
            donation: donation || 0,
            refreshments: refreshments || 0,
            couponDiscount: couponDiscount || 0,
            status: 'completed',
            createdAt: new Date()
        };
        payments.push(payment);

        res.status(201).json(payment);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

/**
 * @desc    Get all payments for current user
 * @route   GET /api/payments/my
 * @access  Private
 */
const getPaymentsByUser = async (req, res) => {
    try {
        const userPayments = payments
            .filter(p => p.userId === req.user._id)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map(p => ({ ...p, rideId: populateRide(p.rideId) || p.rideId }));
        res.json(userPayments);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

/**
 * @desc    Get all payments (admin)
 * @route   GET /api/payments
 * @access  Private (Admin)
 */
const getAllPayments = async (req, res) => {
    try {
        const { populateUser } = require('../mockData');
        const allPayments = payments
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map(p => ({
                ...p,
                userId: populateUser(p.userId, 'name email'),
                rideId: populateRide(p.rideId) || p.rideId
            }));
        res.json(allPayments);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { createPayment, getPaymentsByUser, getAllPayments };
