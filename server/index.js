const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import route files
const authRoutes = require('./routes/authRoutes');
const rideRoutes = require('./routes/rideRoutes');
const driverRoutes = require('./routes/driverRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);

// Health check route
app.get('/', (req, res) => {
    res.json({ message: 'Ucab API is running (Demo Mode - In-Memory Data)' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server (No MongoDB needed - using in-memory mock data)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`\n  Ucab Server running on port ${PORT}`);
    console.log(`  Mode: Demo (In-Memory Data)\n`);
    console.log(`  Demo Accounts:`);
    console.log(`  ─────────────────────────────────`);
    console.log(`  User:   demo@gmail.com   / demo123`);
    console.log(`  Driver: driver@gmail.com / driver123`);
    console.log(`  Admin:  admin@gmail.com  / admin123`);
    console.log(`  ─────────────────────────────────\n`);
});
