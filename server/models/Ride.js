const mongoose = require('mongoose');

// Ride schema - tracks each booking from request to completion
const rideSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        default: null
    },
    pickup: {
        address: { type: String, required: true },
        lat: { type: Number, default: 28.6139 },
        lng: { type: Number, default: 77.2090 }
    },
    drop: {
        address: { type: String, required: true },
        lat: { type: Number, default: 28.5355 },
        lng: { type: Number, default: 77.3910 }
    },
    vehicleType: {
        type: String,
        enum: ['sedan', 'suv', 'auto', 'bike'],
        default: 'sedan'
    },
    distance: {
        type: Number,
        default: 0
    },
    fare: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['requested', 'accepted', 'in-progress', 'completed', 'cancelled'],
        default: 'requested'
    },
    couponCode: {
        type: String,
        default: ''
    },
    discount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    completedAt: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model('Ride', rideSchema);
