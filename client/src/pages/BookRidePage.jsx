import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MapPlaceholder from '../components/MapPlaceholder';

export default function BookRidePage() {
    const { authFetch } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        pickupAddress: '', dropAddress: '',
        vehicleType: 'sedan', couponCode: ''
    });
    const [fareEstimate, setFareEstimate] = useState(null);
    const [nearbyDrivers, setNearbyDrivers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch nearby drivers on mount
    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const res = await authFetch('/drivers/nearby');
                if (res.ok) {
                    const data = await res.json();
                    setNearbyDrivers(data);
                }
            } catch (err) { /* silently fail */ }
        };
        fetchDrivers();
    }, []);

    const vehicleTypes = [
        { id: 'bike', icon: '🏍️', name: 'Bike', rate: '₹8/km' },
        { id: 'auto', icon: '🛺', name: 'Auto', rate: '₹12/km' },
        { id: 'sedan', icon: '🚗', name: 'Sedan', rate: '₹15/km' },
        { id: 'suv', icon: '🚙', name: 'SUV', rate: '₹20/km' }
    ];

    // Get fare estimate
    const handleEstimate = async () => {
        if (!form.pickupAddress || !form.dropAddress) {
            setError('Please enter both pickup and drop locations');
            return;
        }
        setError('');
        setLoading(true);
        try {
            const res = await authFetch('/rides/estimate', {
                method: 'POST',
                body: JSON.stringify({
                    pickup: { address: form.pickupAddress, lat: 28.6139, lng: 77.2090 },
                    drop: { address: form.dropAddress, lat: 28.5355, lng: 77.3910 },
                    vehicleType: form.vehicleType,
                    couponCode: form.couponCode
                })
            });
            const data = await res.json();
            if (res.ok) setFareEstimate(data);
            else setError(data.message);
        } catch (err) {
            setError('Failed to get estimate');
        } finally {
            setLoading(false);
        }
    };

    // Book ride
    const handleBook = async () => {
        setError('');
        setLoading(true);
        try {
            const res = await authFetch('/rides', {
                method: 'POST',
                body: JSON.stringify({
                    pickup: { address: form.pickupAddress, lat: 28.6139, lng: 77.2090 },
                    drop: { address: form.dropAddress, lat: 28.5355, lng: 77.3910 },
                    vehicleType: form.vehicleType,
                    couponCode: form.couponCode
                })
            });
            const data = await res.json();
            if (res.ok) {
                navigate('/tracking', { state: { ride: data.ride } });
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to book ride');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main-content fade-in">
            <div className="page-header">
                <h1>Book a Ride</h1>
                <p>Enter your locations and choose your vehicle</p>
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            <div className="book-ride-layout">
                {/* Left - Booking Form */}
                <div>
                    <div className="card" style={{ marginBottom: '20px' }}>
                        <div className="form-group">
                            <label>Pickup Location</label>
                            <input
                                type="text" className="form-control" placeholder="Enter pickup address"
                                value={form.pickupAddress}
                                onChange={(e) => setForm({ ...form, pickupAddress: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Drop Location</label>
                            <input
                                type="text" className="form-control" placeholder="Enter drop address"
                                value={form.dropAddress}
                                onChange={(e) => setForm({ ...form, dropAddress: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Vehicle Type</label>
                            <div className="vehicle-options">
                                {vehicleTypes.map(v => (
                                    <div
                                        key={v.id}
                                        className={`vehicle-option ${form.vehicleType === v.id ? 'selected' : ''}`}
                                        onClick={() => setForm({ ...form, vehicleType: v.id })}
                                    >
                                        <div className="vehicle-icon">{v.icon}</div>
                                        <div className="vehicle-name">{v.name}</div>
                                        <div className="vehicle-price">{v.rate}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Coupon Code (Optional)</label>
                            <input
                                type="text" className="form-control" placeholder="e.g. FIRSTRIDE"
                                value={form.couponCode}
                                onChange={(e) => setForm({ ...form, couponCode: e.target.value })}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button className="btn btn-secondary" onClick={handleEstimate} disabled={loading}>
                                {loading ? 'Estimating...' : 'Get Estimate'}
                            </button>
                            {fareEstimate && (
                                <button className="btn btn-primary" onClick={handleBook} disabled={loading}>
                                    {loading ? 'Booking...' : 'Book Now'}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Nearby Drivers */}
                    {nearbyDrivers.length > 0 && (
                        <div className="card">
                            <h3 style={{ marginBottom: '16px' }}>Nearby Drivers</h3>
                            {nearbyDrivers.slice(0, 3).map((driver, i) => (
                                <div key={i} className="driver-card" style={{ marginBottom: '10px' }}>
                                    <div className="driver-avatar">🚗</div>
                                    <div className="driver-info">
                                        <h4>{driver.userId?.name || 'Driver'}</h4>
                                        <p>{driver.vehicleModel} • {driver.vehiclePlate}</p>
                                    </div>
                                    <div className="driver-rating">⭐ {driver.rating?.toFixed(1)}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right - Map & Fare Estimate */}
                <div>
                    <MapPlaceholder height="250px" label="Route Preview" />

                    {fareEstimate && (
                        <div className="fare-estimate-card" style={{ marginTop: '20px' }}>
                            <h3>Fare Estimate</h3>
                            <div className="fare-breakdown">
                                <div className="fare-row">
                                    <span>Base fare</span>
                                    <span>₹{fareEstimate.baseFare}</span>
                                </div>
                                <div className="fare-row">
                                    <span>Distance ({fareEstimate.distance} km)</span>
                                    <span>₹{fareEstimate.distanceFare}</span>
                                </div>
                                <div className="fare-row">
                                    <span>Time (~{fareEstimate.estimatedMinutes} min)</span>
                                    <span>₹{fareEstimate.timeFare}</span>
                                </div>
                                {fareEstimate.discount > 0 && (
                                    <div className="fare-row discount">
                                        <span>Coupon discount</span>
                                        <span>-₹{fareEstimate.discount}</span>
                                    </div>
                                )}
                                <div className="fare-row">
                                    <span>Total</span>
                                    <span>₹{fareEstimate.total}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
