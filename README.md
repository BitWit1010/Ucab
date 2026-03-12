

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or above)
- npm (comes with Node.js)
- MongoDB (optional — app works without it in demo mode)

### Installation

1. Clone the repository
      git clone https://github.com/your-username/ucab.git
   cd ucab
   

2. Install backend dependencies
      cd server
   npm install
   

3. Install frontend dependencies
      cd ../client
   npm install
   

### Running the Application

1. Start the backend server
      cd server
   node index.js
   
   Server runs on http://localhost:5000

2. Start the frontend (in a new terminal)
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

> Hari Om Singh:
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
