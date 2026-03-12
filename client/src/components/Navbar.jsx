import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                <div className="logo-icon">U</div>
                <span className="logo">Ucab</span>
            </Link>

            <button className="navbar-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? '✕' : '☰'}
            </button>

            <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
                {!user ? (
                    <>
                        <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                        <Link to="/register" onClick={() => setMenuOpen(false)}>
                            <span className="btn btn-primary btn-sm">Sign Up</span>
                        </Link>
                    </>
                ) : (
                    <>
                        {user.role === 'user' && (
                            <>
                                <Link to="/book" onClick={() => setMenuOpen(false)}>Book Ride</Link>
                                <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                                <Link to="/history" onClick={() => setMenuOpen(false)}>History</Link>
                            </>
                        )}
                        {user.role === 'driver' && (
                            <>
                                <Link to="/driver-dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                                <Link to="/history" onClick={() => setMenuOpen(false)}>History</Link>
                            </>
                        )}
                        {user.role === 'admin' && (
                            <>
                                <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin Panel</Link>
                                <Link to="/book" onClick={() => setMenuOpen(false)}>Book Ride</Link>
                            </>
                        )}
                        <button onClick={() => { handleLogout(); setMenuOpen(false); }}>Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
}
