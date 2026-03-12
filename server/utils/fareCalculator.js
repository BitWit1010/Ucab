/**
 * Fare Calculator Utility
 * Calculates estimated fare based on distance and vehicle type
 */

// Base rates per kilometer for each vehicle type (in INR)
const RATES = {
    bike: { base: 25, perKm: 8, perMin: 1 },
    auto: { base: 30, perKm: 12, perMin: 1.5 },
    sedan: { base: 50, perKm: 15, perMin: 2 },
    suv: { base: 80, perKm: 20, perMin: 2.5 }
};

// Valid coupon codes with discount percentages
const COUPONS = {
    'UCAB10': 10,
    'FIRSTRIDE': 15,
    'SAVE20': 20,
    'STUDENT5': 5
};

/**
 * Calculate fare estimate
 * @param {number} distance - distance in km
 * @param {string} vehicleType - type of vehicle
 * @param {string} couponCode - optional coupon code
 * @returns {object} fare breakdown
 */
const calculateFare = (distance, vehicleType = 'sedan', couponCode = '') => {
    const rate = RATES[vehicleType] || RATES.sedan;

    // Estimate time: avg speed 25 km/h in city
    const estimatedMinutes = Math.round((distance / 25) * 60);

    // Calculate fare components
    const baseFare = rate.base;
    const distanceFare = distance * rate.perKm;
    const timeFare = estimatedMinutes * rate.perMin;

    let subtotal = Math.round(baseFare + distanceFare + timeFare);

    // Apply coupon discount if valid
    let discount = 0;
    if (couponCode && COUPONS[couponCode.toUpperCase()]) {
        discount = Math.round(subtotal * (COUPONS[couponCode.toUpperCase()] / 100));
    }

    const total = Math.max(subtotal - discount, baseFare);

    return {
        baseFare,
        distanceFare: Math.round(distanceFare),
        timeFare: Math.round(timeFare),
        subtotal,
        discount,
        total,
        estimatedMinutes,
        distance: Math.round(distance * 10) / 10,
        vehicleType
    };
};

/**
 * Calculate distance between two coordinate points (Haversine formula)
 */
const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 10) / 10;
};

const toRad = (deg) => deg * (Math.PI / 180);

module.exports = { calculateFare, calculateDistance, COUPONS };
