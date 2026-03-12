import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LandingPage() {
    const { user } = useAuth();

    return (
        <div>
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content slide-up">
                    <h1>Your ride, your way.</h1>
                    <p>
                        Ucab makes it easy to book a cab in seconds. Safe rides, transparent fares,
                        and a seamless experience — whether you're commuting to work or heading across the city.
                    </p>
                    <div className="hero-buttons">
                        {user ? (
                            <Link to="/book" className="btn btn-primary btn-lg">Book a Ride</Link>
                        ) : (
                            <>
                                <Link to="/register" className="btn btn-primary btn-lg">Get Started</Link>
                                <Link to="/login" className="btn btn-secondary btn-lg">Sign In</Link>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <h2>Why choose Ucab?</h2>
                <p className="section-subtitle">Built for riders and drivers who value simplicity and reliability.</p>
                <div className="features-grid stagger-children">
                    <div className="feature-card slide-up">
                        <div className="feature-icon">🚕</div>
                        <h3>Quick Booking</h3>
                        <p>Book a cab in under 30 seconds. Enter your pickup and drop location, choose your vehicle, and go.</p>
                    </div>
                    <div className="feature-card slide-up">
                        <div className="feature-icon">💰</div>
                        <h3>Transparent Fares</h3>
                        <p>See your fare estimate before you book. No hidden charges, no surge surprises.</p>
                    </div>
                    <div className="feature-card slide-up">
                        <div className="feature-icon">🔒</div>
                        <h3>Safe & Secure</h3>
                        <p>Verified drivers, ride tracking, and secure payments for your peace of mind.</p>
                    </div>
                    <div className="feature-card slide-up">
                        <div className="feature-icon">📍</div>
                        <h3>Live Tracking</h3>
                        <p>Track your ride in real-time from pickup to drop-off. Share your trip with family.</p>
                    </div>
                    <div className="feature-card slide-up">
                        <div className="feature-icon">🎟️</div>
                        <h3>Discount Coupons</h3>
                        <p>Apply coupon codes and save on every ride. Special offers for students and first-time riders.</p>
                    </div>
                    <div className="feature-card slide-up">
                        <div className="feature-icon">📱</div>
                        <h3>Ride History</h3>
                        <p>Access your complete ride history anytime. Download receipts and track expenses.</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section slide-up">
                <h2>Ready to ride?</h2>
                <p>Join thousands of riders who trust Ucab for their daily commute.</p>
                {!user && (
                    <Link to="/register" className="btn btn-primary btn-lg">Create Free Account</Link>
                )}
            </section>
        </div>
    );
}
