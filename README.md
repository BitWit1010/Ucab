# 🚕 Ucab — Cab Booking Web Application

A full-stack cab booking platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js). Features a modern dark-themed UI inspired by Uber, with user/driver/admin roles, fare estimation, ride tracking, and payment integration.

> Built as a realistic student startup project — clean, professional, and portfolio-ready.

---

## 📸 Screenshots

### Landing Page
![Landing Page](https://via.placeholder.com/800x400/121212/FFFFFF?text=Ucab+Landing+Page)

### User Dashboard
![Dashboard](https://via.placeholder.com/800x400/1E1E1E/FFFFFF?text=User+Dashboard)

---

## ✨ Features

### 👤 User Features
- Registration & Login — JWT-based authentication with password hashing (bcryptjs)
- Book a Cab — Enter pickup & drop locations, choose vehicle type
- Fare Estimation — View fare breakdown before booking (base + distance + time)
- Vehicle Selection — Choose from Bike, Auto, Sedan, or SUV
- Real-Time Ride Tracking — Track ride progress with step-by-step status
- Booking History — View past rides with status filters
- Payment System — UPI, Card, or Cash with order summary
- Discount Coupons — Apply codes like UCAB10, FIRSTRIDE, STUDENT5
- Donations — Optional ₹10 community driver support
- Refreshments — Add water bottle & mints for ₹30

### 🚗 Driver Features
- Driver Registration — Register with vehicle details and license
- Availability Toggle — Go online/offline with one click
- Driver Dashboard — View stats, rating, vehicle info, and ride history
- Verification Status — Track admin verification progress

### 🛡 Admin Features
- Admin Dashboard — Overview stats (users, drivers, rides, revenue)
- User Management — View all registered users
- Driver Verification — Verify/approve driver profiles
- Ride Management — Monitor all rides and their statuses

### 🔐 Security
- JWT token-based authentication
- Password hashing with bcryptjs
- Role-based access control (User, Driver, Admin)
- Protected API routes with middleware

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, React Router, Vite |
| Styling | Vanilla CSS (custom dark theme) |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose (or In-Memory Demo Mode) |
| Authentication | JWT (jsonwebtoken) + bcryptjs |
| HTTP Client | Fetch API |

---

## 🎨 Color Palette

| Purpose | Color | Hex |
|---|---|---|
| Background | Dark Black | #121212 |
| Secondary BG | Charcoal | #1E1E1E |
| Cards | Soft Dark Grey | #232323 |
| Buttons | Graphite | #2F2F2F |
| Button Hover | Lighter Grey | #3F3F3F |
| Primary Text | White | #FFFFFF |
| Secondary Text | Light Grey | #B0B0B0 |
| Accent | Steel Grey | #505050 |

---

## 📁 Project Structure
ucab/
├── server/                     # Backend (Express.js)
│   ├── config/
│   │   └── db.js               # MongoDB connection helper
│   ├── controllers/
│   │   ├── authController.js   # Register, Login, Profile
│   │   ├── rideController.js   # Ride CRUD & fare estimation
│   │   ├── driverController.js # Driver registration & management
│   │   ├── paymentController.js# Payment processing
│   │   └── adminController.js  # Admin dashboard & stats
│   ├── middleware/
│   │   └── auth.js             # JWT verification & role-based access
│   ├── models/
│   │   ├── User.js             # User schema
│   │   ├── Driver.js           # Driver profile schema
│   │   ├── Ride.js             # Ride booking schema
│   │   └── Payment.js          # Payment schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── rideRoutes.js
│   │   ├── driverRoutes.js
│   │   ├── paymentRoutes.js
│   │   └── adminRoutes.js
│   ├── utils/
│   │   └── fareCalculator.js   # Fare estimation & distance calculation
│   ├── mockData.js             # In-memory demo data
│   ├── index.js                # Server entry point
│   ├── .env                    # Environment variables
│   └── package.json
│
├── client/                     # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx      # Navigation bar with role-based links
│   │   │   ├── Footer.jsx      # Footer component
│   │   │   ├── RideCard.jsx    # Reusable ride info card
│   │   │   ├── DriverCard.jsx  # Driver info card
│   │   │   ├── MapPlaceholder.jsx  # Map area placeholder
│   │   │   └── LoadingSpinner.jsx  # CSS loading spinner
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Authentication state management
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx     # Home page with hero & features
│   │   │   ├── LoginPage.jsx       # User login
│   │   │   ├── RegisterPage.jsx    # User registration
│   │   │   ├── BookRidePage.jsx    # Ride booking with fare estimate
│   │   │   ├── UserDashboard.jsx   # User dashboard
│   │   │   ├── DriverDashboard.jsx # Driver dashboard
│   │   │   ├── RideTrackingPage.jsx# Live ride tracking
│   │   │   ├── BookingHistory.jsx  # Ride history with filters
│   │   │   ├── AdminPanel.jsx      # Admin management panel
│   │   │   └── PaymentPage.jsx     # Payment with add-ons
│   │   ├── App.jsx             # Router & app layout
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Global styles & design system
│   ├── index.html
│   └── package.json
│
└── README.md

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or above)
- npm (comes with Node.js)
- MongoDB (optional — app works without it in demo mode)

### Installation

1. Clone the repository
   
Bash

   git clone https://github.com/your-username/ucab.git
   cd ucab
   

2. Install backend dependencies
   
Bash

   cd server
   npm install
   

3. Install frontend dependencies
   
Bash

   cd ../client
   npm install
   

### Running the Application

1. Start the backend server
   
Bash

   cd server
   node index.js
   
   Server runs on http://localhost:5000

2. Start the frontend (in a new terminal)
   
Bash

   cd client
   npm run dev
   
   App opens on http://localhost:5173

---

## 🔑 Demo Accounts

The app comes pre-loaded with demo accounts (no database required):

| Role | Email | Password |
|---|---|---|
| User | demo@gmail.com | demo123 |
| Driver | driver@gmail.com | driver123 |
| Admin | admin@gmail.com | admin123 |

You can also create new accounts from the Register page.

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | /api/auth/register | Register new user | Public |
| POST | /api/auth/login | Login & get JWT token | Public |
| GET | /api/auth/profile | Get current user profile | Private |
### Rides
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | /api/rides | Book a new ride | Private |
| POST | /api/rides/estimate | Get fare estimate | Private |
| GET | /api/rides/my | Get user's rides | Private |
| GET | /api/rides/:id | Get ride by ID | Private |
| PUT | /api/rides/:id/status | Update ride status | Private |
| GET | /api/rides/all | Get all rides | Admin |

### Drivers
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | /api/drivers | Get verified drivers | Public |
| POST | /api/drivers/register | Register as driver | Private |
| GET | /api/drivers/nearby | Get nearby drivers | Private |
| GET | /api/drivers/profile | Get driver profile | Private |
| PUT | /api/drivers/toggle-availability | Toggle online/offline | Private |
| PUT | /api/drivers/:id/verify | Verify a driver | Admin |

### Payments
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | /api/payments | Create payment | Private |
| GET | /api/payments/my | Get user's payments | Private |
| GET | /api/payments/all | Get all payments | Admin |

### Admin
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | /api/admin/stats | Dashboard statistics | Admin |
| GET | /api/admin/users | All users list | Admin |
| GET | /api/admin/drivers | All drivers list | Admin |

---

## 🎟 Available Coupon Codes

| Code | Discount |
|---|---|
| UCAB10 | 10% off |
| FIRSTRIDE | 15% off |
| SAVE20 | 20% off |
| STUDENT5 | 5% off |

---

## 🧩 Environment Variables

Create a .env file in the server/ directory:

env

PORT=5000
MONGO_URI=mongodb://localhost:27017/ucab
JWT_SECRET=ucab_jwt_secret_key_2024

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (git checkout -b feature/new-feature)
3. Commit your changes (git commit -m 'Add new feature')
4. Push to the branch (git push origin feature/new-feature)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Himanshu

Built with ❤️ as a student project for learning and portfolio purposes.
