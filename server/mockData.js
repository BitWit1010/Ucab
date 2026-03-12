const bcrypt = require('bcryptjs');

/**
 * In-Memory Mock Database
 * Simulates MongoDB collections so the app works without a database.
 * Pre-seeded with demo accounts.
 */

// Hash the demo passwords synchronously at startup
const demoPasswordHash = bcrypt.hashSync('demo123', 10);
const driverPasswordHash = bcrypt.hashSync('driver123', 10);
const adminPasswordHash = bcrypt.hashSync('admin123', 10);

// ---------- USERS ----------
const users = [
    {
        _id: 'user_001',
        name: 'Demo User',
        email: 'demo@gmail.com',
        password: demoPasswordHash,
        phone: '+91 9876543210',
        role: 'user',
        createdAt: new Date('2024-06-15')
    },
    {
        _id: 'driver_001_user',
        name: 'Rajesh Kumar',
        email: 'driver@gmail.com',
        password: driverPasswordHash,
        phone: '+91 9876543211',
        role: 'driver',
        createdAt: new Date('2024-07-01')
    },
    {
        _id: 'driver_002_user',
        name: 'Amit Sharma',
        email: 'amit@gmail.com',
        password: driverPasswordHash,
        phone: '+91 9876543212',
        role: 'driver',
        createdAt: new Date('2024-07-10')
    },
    {
        _id: 'admin_001',
        name: 'Admin',
        email: 'admin@gmail.com',
        password: adminPasswordHash,
        phone: '+91 9000000000',
        role: 'admin',
        createdAt: new Date('2024-01-01')
    }
];

// ---------- DRIVERS ----------
const drivers = [
    {
        _id: 'drv_001',
        userId: 'driver_001_user',
        vehicleType: 'sedan',
        vehicleModel: 'Maruti Swift',
        vehiclePlate: 'DL 01 AB 1234',
        licenseNumber: 'DL-1420110012345',
        rating: 4.7,
        totalRides: 342,
        isVerified: true,
        isAvailable: true,
        location: { lat: 28.6229, lng: 77.2195 },
        createdAt: new Date('2024-07-01')
    },
    {
        _id: 'drv_002',
        userId: 'driver_002_user',
        vehicleType: 'suv',
        vehicleModel: 'Hyundai Creta',
        vehiclePlate: 'DL 02 CD 5678',
        licenseNumber: 'DL-1420110067890',
        rating: 4.5,
        totalRides: 189,
        isVerified: true,
        isAvailable: true,
        location: { lat: 28.6100, lng: 77.2300 },
        createdAt: new Date('2024-07-10')
    },
    {
        _id: 'drv_003',
        userId: 'driver_001_user',
        vehicleType: 'auto',
        vehicleModel: 'Bajaj RE',
        vehiclePlate: 'DL 03 EF 9012',
        licenseNumber: 'DL-1420110099999',
        rating: 4.2,
        totalRides: 78,
        isVerified: false,
        isAvailable: true,
        location: { lat: 28.6300, lng: 77.2100 },
        createdAt: new Date('2024-08-01')
    }
];

// ---------- RIDES ----------
const rides = [
    {
        _id: 'ride_001',
        userId: 'user_001',
        driverId: 'drv_001',
        pickup: { address: 'Connaught Place, Delhi', lat: 28.6315, lng: 77.2167 },
        drop: { address: 'Noida Sector 62', lat: 28.6270, lng: 77.3650 },
        vehicleType: 'sedan',
        distance: 18.5,
        fare: 345,
        status: 'completed',
        couponCode: '',
        discount: 0,
        createdAt: new Date('2024-12-20T10:30:00'),
        completedAt: new Date('2024-12-20T11:15:00')
    },
    {
        _id: 'ride_002',
        userId: 'user_001',
        driverId: 'drv_002',
        pickup: { address: 'Hauz Khas Village, Delhi', lat: 28.5494, lng: 77.2001 },
        drop: { address: 'India Gate, Delhi', lat: 28.6129, lng: 77.2295 },
        vehicleType: 'suv',
        distance: 8.2,
        fare: 280,
        status: 'completed',
        couponCode: 'UCAB10',
        discount: 28,
        createdAt: new Date('2025-01-05T14:20:00'),
        completedAt: new Date('2025-01-05T14:55:00')
    },
    {
        _id: 'ride_003',
        userId: 'user_001',
        driverId: null,
        pickup: { address: 'Saket Metro Station, Delhi', lat: 28.5207, lng: 77.2033 },
        drop: { address: 'IGI Airport T3, Delhi', lat: 28.5562, lng: 77.1000 },
        vehicleType: 'sedan',
        distance: 14.0,
        fare: 275,
        status: 'requested',
        couponCode: '',
        discount: 0,
        createdAt: new Date('2025-03-12T09:00:00'),
        completedAt: null
    }
];

// ---------- PAYMENTS ----------
const payments = [
    {
        _id: 'pay_001',
        rideId: 'ride_001',
        userId: 'user_001',
        amount: 345,
        method: 'upi',
        status: 'completed',
        donation: 10,
        refreshments: 0,
        couponDiscount: 0,
        createdAt: new Date('2024-12-20T11:16:00')
    },
    {
        _id: 'pay_002',
        rideId: 'ride_002',
        userId: 'user_001',
        amount: 252,
        method: 'card',
        status: 'completed',
        donation: 0,
        refreshments: 30,
        couponDiscount: 28,
        createdAt: new Date('2025-01-05T14:56:00')
    }
];

// ---------- HELPER: Populate references ----------
function populateUser(userId, fields) {
    const user = users.find(u => u._id === userId);
    if (!user) return null;
    if (fields) {
        const result = { _id: user._id };
        fields.split(' ').forEach(f => { if (user[f] !== undefined) result[f] = user[f]; });
        return result;
    }
    const { password, ...safe } = user;
    return safe;
}

function populateDriver(driverId) {
    const driver = drivers.find(d => d._id === driverId);
    if (!driver) return null;
    return { ...driver, userId: populateUser(driver.userId, 'name email phone') };
}

function populateRide(rideId) {
    return rides.find(r => r._id === rideId) || null;
}

// Generate simple unique IDs
let idCounter = 100;
function genId(prefix) { return `${prefix}_${++idCounter}`; }

module.exports = {
    users, drivers, rides, payments,
    populateUser, populateDriver, populateRide,
    genId
};
