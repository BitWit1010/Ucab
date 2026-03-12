import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PaymentPage() {
    const { authFetch } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const ride = location.state?.ride || null;

    const [method, setMethod] = useState('upi');
    const [donation, setDonation] = useState(false);
    const [refreshments, setRefreshments] = useState(false);
    const [coupon, setCoupon] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const baseFare = ride?.fare || 245;
    const donationAmount = donation ? 10 : 0;
    const refreshmentAmount = refreshments ? 30 : 0;
    const total = baseFare + donationAmount + refreshmentAmount;

    const paymentMethods = [
        { id: 'upi', icon: '📱', name: 'UPI' },
        { id: 'card', icon: '💳', name: 'Card' },
        { id: 'cash', icon: '💵', name: 'Cash' }
    ];

    const handlePay = async () => {
        setLoading(true);
        try {
            const res = await authFetch('/payments', {
                method: 'POST',
                body: JSON.stringify({
                    rideId: ride?._id || '000000000000000000000000',
                    amount: total,
                    method,
                    donation: donationAmount,
                    refreshments: refreshmentAmount,
                    couponDiscount: 0
                })
            });
            if (res.ok) {
                setSuccess(true);
                setTimeout(() => navigate('/dashboard'), 2500);
            }
        } catch (err) { /* silently fail */ }
        finally { setLoading(false); }
    };

    if (success) {
        return (
            <div className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
                <div className="card slide-up" style={{ textAlign: 'center', maxWidth: '400px' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✅</div>
                    <h2 style={{ marginBottom: '8px' }}>Payment Successful</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        ₹{total} paid via {method.toUpperCase()}
                    </p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '12px' }}>
                        Redirecting to dashboard...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="main-content fade-in">
            <div className="page-header">
                <h1>Payment</h1>
                <p>Complete your ride payment</p>
            </div>

            <div className="payment-layout">
                {/* Left - Payment Options */}
                <div>
                    {/* Payment Method */}
                    <div className="card" style={{ marginBottom: '20px' }}>
                        <h3 style={{ marginBottom: '16px' }}>Payment Method</h3>
                        {paymentMethods.map(pm => (
                            <div
                                key={pm.id}
                                className={`payment-method ${method === pm.id ? 'selected' : ''}`}
                                onClick={() => setMethod(pm.id)}
                            >
                                <span className="method-icon">{pm.icon}</span>
                                <span className="method-name">{pm.name}</span>
                                {method === pm.id && <span style={{ marginLeft: 'auto', color: 'var(--success)' }}>✓</span>}
                            </div>
                        ))}
                    </div>

                    {/* Add-ons */}
                    <div className="card" style={{ marginBottom: '20px' }}>
                        <h3 style={{ marginBottom: '16px' }}>Add-ons</h3>

                        <div className="addon-item">
                            <div>
                                <p style={{ fontWeight: 500 }}>Donate ₹10</p>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Support community drivers</p>
                            </div>
                            <label className="addon-toggle">
                                <input type="checkbox" checked={donation} onChange={() => setDonation(!donation)} />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div className="addon-item">
                            <div>
                                <p style={{ fontWeight: 500 }}>Refreshments ₹30</p>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Water bottle & mints</p>
                            </div>
                            <label className="addon-toggle">
                                <input type="checkbox" checked={refreshments} onChange={() => setRefreshments(!refreshments)} />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>

                    {/* Coupon */}
                    <div className="card">
                        <h3 style={{ marginBottom: '16px' }}>Coupon Code</h3>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input
                                type="text" className="form-control" placeholder="Enter coupon code"
                                value={coupon} onChange={(e) => setCoupon(e.target.value)}
                            />
                            <button className="btn btn-secondary">Apply</button>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                            Try: UCAB10, FIRSTRIDE, STUDENT5
                        </p>
                    </div>
                </div>

                {/* Right - Order Summary */}
                <div>
                    <div className="card" style={{ position: 'sticky', top: '84px' }}>
                        <h3 style={{ marginBottom: '20px' }}>Order Summary</h3>

                        {/* Route */}
                        <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
                            <div className="ride-location" style={{ marginBottom: '8px' }}>
                                <span className="dot pickup"></span>
                                <span style={{ fontSize: '0.9rem' }}>{ride?.pickup?.address || 'Connaught Place, Delhi'}</span>
                            </div>
                            <div className="ride-location">
                                <span className="dot drop"></span>
                                <span style={{ fontSize: '0.9rem' }}>{ride?.drop?.address || 'Noida Sector 62'}</span>
                            </div>
                        </div>

                        {/* Fare Breakdown */}
                        <div className="fare-breakdown">
                            <div className="fare-row">
                                <span>Ride fare</span>
                                <span>₹{baseFare}</span>
                            </div>
                            {donationAmount > 0 && (
                                <div className="fare-row">
                                    <span>Donation</span>
                                    <span>₹{donationAmount}</span>
                                </div>
                            )}
                            {refreshmentAmount > 0 && (
                                <div className="fare-row">
                                    <span>Refreshments</span>
                                    <span>₹{refreshmentAmount}</span>
                                </div>
                            )}
                            <div className="fare-row">
                                <span>Total</span>
                                <span>₹{total}</span>
                            </div>
                        </div>

                        <button
                            className="btn btn-primary btn-block"
                            style={{ marginTop: '20px' }}
                            onClick={handlePay}
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : `Pay ₹${total}`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
