import { useLocation, Link } from 'react-router-dom';
import MapPlaceholder from '../components/MapPlaceholder';

export default function RideTrackingPage() {
    const location = useLocation();
    const ride = location.state?.ride || null;

    // Tracking steps with simulated statuses
    const steps = [
        { label: 'Ride Requested', desc: 'Looking for nearby drivers', status: 'completed', icon: '✓' },
        { label: 'Driver Assigned', desc: 'Your driver is on the way', status: 'completed', icon: '✓' },
        { label: 'Pickup', desc: ride?.pickup?.address || 'Pickup location', status: 'active', icon: '3' },
        { label: 'In Transit', desc: 'Heading to your destination', status: 'pending', icon: '4' },
        { label: 'Arrived', desc: ride?.drop?.address || 'Drop location', status: 'pending', icon: '5' }
    ];

    return (
        <div className="main-content fade-in">
            <div className="page-header">
                <h1>Ride Tracking</h1>
                <p>Track your ride in real-time</p>
            </div>

            <div className="tracking-layout">
                {/* Map Section */}
                <div>
                    <MapPlaceholder height="450px" label="Live Ride Tracking" />
                </div>

                {/* Ride Info Sidebar */}
                <div>
                    {/* Status Card */}
                    <div className="card" style={{ marginBottom: '20px' }}>
                        <h3 style={{ marginBottom: '4px' }}>
                            {ride ? `Ride #${ride._id?.slice(-6).toUpperCase()}` : 'Ride Status'}
                        </h3>
                        <span className="badge badge-warning" style={{ marginBottom: '16px', display: 'inline-flex' }}>
                            {ride?.status || 'in-progress'}
                        </span>

                        {/* Route */}
                        <div style={{ marginTop: '16px' }}>
                            <div className="ride-location" style={{ marginBottom: '8px' }}>
                                <span className="dot pickup"></span>
                                <span>{ride?.pickup?.address || 'Connaught Place, Delhi'}</span>
                            </div>
                            <div className="ride-location">
                                <span className="dot drop"></span>
                                <span>{ride?.drop?.address || 'Noida Sector 62'}</span>
                            </div>
                        </div>

                        {ride && (
                            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '6px' }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>Fare</span>
                                    <span>₹{ride.fare}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '6px' }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>Distance</span>
                                    <span>{ride.distance} km</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>Vehicle</span>
                                    <span style={{ textTransform: 'capitalize' }}>{ride.vehicleType}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Progress Steps */}
                    <div className="card">
                        <h3 style={{ marginBottom: '16px' }}>Ride Progress</h3>
                        <div className="tracking-steps">
                            {steps.map((step, i) => (
                                <div key={i} className="tracking-step">
                                    <div className={`step-dot ${step.status}`}>
                                        {step.icon}
                                    </div>
                                    <div className="step-info">
                                        <h4>{step.label}</h4>
                                        <p>{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Driver Card */}
                    <div className="card" style={{ marginTop: '20px' }}>
                        <h3 style={{ marginBottom: '12px' }}>Your Driver</h3>
                        <div className="driver-card" style={{ border: 'none', padding: 0 }}>
                            <div className="driver-avatar">👤</div>
                            <div className="driver-info">
                                <h4>Rajesh Kumar</h4>
                                <p>Maruti Swift • DL 01 AB 1234</p>
                            </div>
                            <div className="driver-rating">⭐ 4.7</div>
                        </div>
                    </div>

                    <Link to="/payment" className="btn btn-primary btn-block" style={{ marginTop: '20px' }}>
                        Proceed to Payment
                    </Link>
                </div>
            </div>
        </div>
    );
}
