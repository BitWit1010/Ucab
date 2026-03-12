import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import RideCard from '../components/RideCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function DriverDashboard() {
    const { user, authFetch } = useAuth();
    const [driverProfile, setDriverProfile] = useState(null);
    const [rides, setRides] = useState([]);
    const [loading, setLoading] = useState(true);

    // Registration form state (if no driver profile exists)
    const [regForm, setRegForm] = useState({
        vehicleType: 'sedan', vehicleModel: '', vehiclePlate: '', licenseNumber: ''
    });
    const [regError, setRegError] = useState('');

    useEffect(() => {
        fetchDriverData();
    }, []);

    const fetchDriverData = async () => {
        try {
            const profileRes = await authFetch('/drivers/profile');
            if (profileRes.ok) {
                const profile = await profileRes.json();
                setDriverProfile(profile);
            }
            const ridesRes = await authFetch('/rides/my');
            if (ridesRes.ok) {
                const data = await ridesRes.json();
                setRides(data);
            }
        } catch (err) { /* silently fail */ }
        finally { setLoading(false); }
    };

    const handleToggleAvailability = async () => {
        try {
            const res = await authFetch('/drivers/toggle-availability', { method: 'PUT' });
            if (res.ok) {
                const data = await res.json();
                setDriverProfile(data.driver);
            }
        } catch (err) { /* silently fail */ }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setRegError('');
        try {
            const res = await authFetch('/drivers/register', {
                method: 'POST',
                body: JSON.stringify(regForm)
            });
            const data = await res.json();
            if (res.ok) {
                setDriverProfile(data);
            } else {
                setRegError(data.message);
            }
        } catch (err) {
            setRegError('Registration failed');
        }
    };

    if (loading) return <LoadingSpinner />;

    // Show driver registration form if no profile
    if (!driverProfile) {
        return (
            <div className="main-content fade-in">
                <div className="page-header">
                    <h1>Driver Registration</h1>
                    <p>Complete your driver profile to start accepting rides</p>
                </div>

                {regError && <div className="alert alert-error">{regError}</div>}

                <div className="card" style={{ maxWidth: '600px' }}>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <label>Vehicle Type</label>
                            <select
                                className="form-control" value={regForm.vehicleType}
                                onChange={(e) => setRegForm({ ...regForm, vehicleType: e.target.value })}
                            >
                                <option value="bike">Bike</option>
                                <option value="auto">Auto</option>
                                <option value="sedan">Sedan</option>
                                <option value="suv">SUV</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Vehicle Model</label>
                            <input
                                type="text" className="form-control" placeholder="e.g. Maruti Swift"
                                value={regForm.vehicleModel}
                                onChange={(e) => setRegForm({ ...regForm, vehicleModel: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Vehicle Plate</label>
                                <input
                                    type="text" className="form-control" placeholder="e.g. DL 01 AB 1234"
                                    value={regForm.vehiclePlate}
                                    onChange={(e) => setRegForm({ ...regForm, vehiclePlate: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>License Number</label>
                                <input
                                    type="text" className="form-control" placeholder="e.g. DL-1234567890"
                                    value={regForm.licenseNumber}
                                    onChange={(e) => setRegForm({ ...regForm, licenseNumber: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Register as Driver</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="main-content fade-in">
            <div className="dashboard-header">
                <div>
                    <h1>Driver Dashboard</h1>
                    <p>Welcome, {user?.name || 'Driver'}</p>
                </div>
                <button
                    className={`btn ${driverProfile.isAvailable ? 'btn-success' : 'btn-secondary'}`}
                    onClick={handleToggleAvailability}
                >
                    {driverProfile.isAvailable ? '🟢 Online' : '⚫ Offline'}
                </button>
            </div>

            {!driverProfile.isVerified && (
                <div className="alert alert-info">
                    Your driver profile is pending verification. An admin will verify your documents shortly.
                </div>
            )}

            {/* Driver Stats */}
            <div className="dashboard-stats stagger-children">
                <div className="stat-card slide-up">
                    <div className="stat-label">Total Rides</div>
                    <div className="stat-value">{driverProfile.totalRides}</div>
                </div>
                <div className="stat-card slide-up">
                    <div className="stat-label">Rating</div>
                    <div className="stat-value">⭐ {driverProfile.rating?.toFixed(1)}</div>
                </div>
                <div className="stat-card slide-up">
                    <div className="stat-label">Vehicle</div>
                    <div className="stat-value" style={{ fontSize: '1rem' }}>{driverProfile.vehicleModel}</div>
                </div>
                <div className="stat-card slide-up">
                    <div className="stat-label">Status</div>
                    <div className="stat-value" style={{ fontSize: '1rem' }}>
                        {driverProfile.isVerified ? '✅ Verified' : '⏳ Pending'}
                    </div>
                </div>
            </div>

            {/* Driver Details Card */}
            <div className="card" style={{ marginBottom: '24px' }}>
                <h3 style={{ marginBottom: '16px' }}>Vehicle Details</h3>
                <div className="grid-2">
                    <div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Vehicle Type</p>
                        <p style={{ textTransform: 'capitalize' }}>{driverProfile.vehicleType}</p>
                    </div>
                    <div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Plate Number</p>
                        <p>{driverProfile.vehiclePlate}</p>
                    </div>
                    <div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>License</p>
                        <p>{driverProfile.licenseNumber}</p>
                    </div>
                    <div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Availability</p>
                        <p>{driverProfile.isAvailable ? 'Online' : 'Offline'}</p>
                    </div>
                </div>
            </div>

            {/* Recent Rides */}
            <div className="section">
                <h3 style={{ marginBottom: '16px' }}>Recent Rides</h3>
                {rides.length > 0 ? (
                    rides.slice(0, 5).map(ride => <RideCard key={ride._id} ride={ride} />)
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon">🚗</div>
                        <h3>No rides yet</h3>
                        <p>Go online to start receiving ride requests.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
