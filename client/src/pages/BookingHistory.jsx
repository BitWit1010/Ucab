import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import RideCard from '../components/RideCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function BookingHistory() {
    const { authFetch } = useAuth();
    const [rides, setRides] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchRides = async () => {
            try {
                const res = await authFetch('/rides/my');
                if (res.ok) {
                    const data = await res.json();
                    setRides(data);
                    setFiltered(data);
                }
            } catch (err) { /* silently fail */ }
            finally { setLoading(false); }
        };
        fetchRides();
    }, []);

    // Apply filter
    useEffect(() => {
        if (filter === 'all') {
            setFiltered(rides);
        } else {
            setFiltered(rides.filter(r => r.status === filter));
        }
    }, [filter, rides]);

    return (
        <div className="main-content fade-in">
            <div className="page-header">
                <h1>Booking History</h1>
                <p>View all your past and ongoing rides</p>
            </div>

            {/* Filter Tabs */}
            <div className="admin-tabs" style={{ marginBottom: '24px' }}>
                {['all', 'requested', 'accepted', 'in-progress', 'completed', 'cancelled'].map(f => (
                    <button
                        key={f}
                        className={`admin-tab ${filter === f ? 'active' : ''}`}
                        onClick={() => setFilter(f)}
                    >
                        {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            {loading ? (
                <LoadingSpinner />
            ) : filtered.length > 0 ? (
                <div className="stagger-children">
                    {filtered.map(ride => (
                        <RideCard key={ride._id} ride={ride} />
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <div className="empty-icon">📋</div>
                    <h3>No rides found</h3>
                    <p>{filter === 'all' ? "You haven't taken any rides yet." : `No ${filter} rides found.`}</p>
                </div>
            )}
        </div>
    );
}
