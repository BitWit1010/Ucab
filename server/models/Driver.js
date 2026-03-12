const mongoose = require('mongoose');

// Driver profile schema - linked to a User document
const driverSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    vehicleType: {
        type: String,
        enum: ['sedan', 'suv', 'auto', 'bike'],
        required: [true, 'Vehicle type is required']
    },
    vehicleModel: {
        type: String,
        required: [true, 'Vehicle model is required'],
        trim: true
    },
    vehiclePlate: {
        type: String,
        required: [true, 'Vehicle plate number is required'],
        uppercase: true,
        trim: true
    },
    licenseNumber: {
        type: String,
        required: [true, 'License number is required'],
        trim: true
    },
    rating: {
        type: Number,
        default: 4.5,
        min: 0,
        max: 5
    },
    totalRides: {
        type: Number,
        default: 0
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAvailable: {
        type: Boolean,
        default: false
    },
    location: {
        lat: { type: Number, default: 28.6139 },
        lng: { type: Number, default: 77.2090 }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Driver', driverSchema);
