import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BookRidePage from './pages/BookRidePage';
import UserDashboard from './pages/UserDashboard';
import DriverDashboard from './pages/DriverDashboard';
import RideTrackingPage from './pages/RideTrackingPage';
import BookingHistory from './pages/BookingHistory';
import AdminPanel from './pages/AdminPanel';
import PaymentPage from './pages/PaymentPage';

import './index.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/book" element={<BookRidePage />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/driver-dashboard" element={<DriverDashboard />} />
            <Route path="/tracking" element={<RideTrackingPage />} />
            <Route path="/history" element={<BookingHistory />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
