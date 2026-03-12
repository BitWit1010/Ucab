import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RideCard from '../components/RideCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function UserDashboard() {
    const { user, authFetch } = useAuth();
    const [recentRides, setRecentRides] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRides = async () => {
            try {
                const res = await authFetch('/rides/my');
                if (res.ok) {
                    const data = await res.json();
                    setRecentRides(data.slice(0, 5));
                }
            } catch (err) { /* silently fail */ }
            finally { setLoading(false); }
        };
        fetchRides();
    }, []);

    const stats = {
        total: recentRides.length,
        completed: recentRides.filter(r => r.status === 'completed').length,
        totalSpent: recentRides.reduce((sum, r) => sum + (r.fare || 0), 0)
    };

    return (
        <div className="main-content fade-in">
            {/* Welcome Banner */}
            <div className="welcome-banner">
                <h2>Welcome back, {user?.name || 'Rider'} 👋</h2>
                <p>Ready for your next ride? Book a cab in seconds.</p>
                <Link to="/book" className="btn btn-primary" style={{ marginTop: '16px' }}>
                    Book a Ride
                </Link>
            </div>

            {/* Quick Stats */}
            <div className="dashboard-stats stagger-children">
                <div className="stat-card slide-up">
                    <div className="stat-label">Total Rides</div>
                    <div className="stat-value">{stats.total}</div>
                </div>
                <div className="stat-card slide-up">
                    <div className="stat-label">Completed</div>
                    <div className="stat-value">{stats.completed}</div>
                </div>
                <div className="stat-card slide-up">
                    <div className="stat-label">Total Spent</div>
                    <div className="stat-value">₹{stats.totalSpent}</div>
                </div>
                <div className="stat-card slide-up">
                    <div className="stat-label">Member Since</div>
                    <div className="stat-value" style={{ fontSize: '1rem' }}>
                        {new Date(user?.createdAt || Date.now()).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                    </div>
                </div>
            </div>

            {/* Recent Rides */}
            <div className="section">
                <div className="card-header">
                    <h3>Recent Rides</h3>
                    <Link to="/history" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>View all →</Link>
                </div>
                {loading ? (
                    <LoadingSpinner />
                ) : recentRides.length > 0 ? (
                    recentRides.map(ride => <RideCard key={ride._id} ride={ride} />)
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon">🚕</div>
                        <h3>No rides yet</h3>
                        <p>Book your first ride and it'll show up here.</p>
                        <Link to="/book" className="btn btn-secondary">Book Now</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
