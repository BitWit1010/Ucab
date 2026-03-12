import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

export default function AdminPanel() {
    const { authFetch } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [rides, setRides] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAdminData();
    }, []);

    const fetchAdminData = async () => {
        try {
            const [statsRes, usersRes, driversRes, ridesRes] = await Promise.all([
                authFetch('/admin/stats'),
                authFetch('/admin/users'),
                authFetch('/admin/drivers'),
                authFetch('/rides/all')
            ]);

            if (statsRes.ok) setStats(await statsRes.json());
            if (usersRes.ok) setUsers(await usersRes.json());
            if (driversRes.ok) setDrivers(await driversRes.json());
            if (ridesRes.ok) setRides(await ridesRes.json());
        } catch (err) { /* silently fail */ }
        finally { setLoading(false); }
    };

    const handleVerifyDriver = async (driverId) => {
        try {
            const res = await authFetch(`/drivers/${driverId}/verify`, { method: 'PUT' });
            if (res.ok) {
                setDrivers(drivers.map(d => d._id === driverId ? { ...d, isVerified: true } : d));
            }
        } catch (err) { /* silently fail */ }
    };

    if (loading) return <LoadingSpinner />;

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'users', label: 'Users' },
        { id: 'drivers', label: 'Drivers' },
        { id: 'rides', label: 'Rides' }
    ];

    return (
        <div className="main-content fade-in">
            <div className="page-header">
                <h1>Admin Panel</h1>
                <p>Manage users, drivers, and rides</p>
            </div>

            {/* Tabs */}
            <div className="admin-tabs">
                {tabs.map(tab => (
                    <button key={tab.id}
                        className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && stats && (
                <div>
                    <div className="dashboard-stats stagger-children">
                        <div className="stat-card slide-up">
                            <div className="stat-label">Total Users</div>
                            <div className="stat-value">{stats.totalUsers}</div>
                        </div>
                        <div className="stat-card slide-up">
                            <div className="stat-label">Total Drivers</div>
                            <div className="stat-value">{stats.totalDrivers}</div>
                        </div>
                        <div className="stat-card slide-up">
                            <div className="stat-label">Total Rides</div>
                            <div className="stat-value">{stats.totalRides}</div>
                        </div>
                        <div className="stat-card slide-up">
                            <div className="stat-label">Revenue</div>
                            <div className="stat-value">₹{stats.totalRevenue}</div>
                        </div>
                    </div>
                    <div className="grid-2" style={{ marginTop: '20px' }}>
                        <div className="stat-card">
                            <div className="stat-label">Completed Rides</div>
                            <div className="stat-value">{stats.completedRides}</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-label">Pending Verifications</div>
                            <div className="stat-value">{stats.pendingVerifications}</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Role</th>
                                <th>Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? users.map(user => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td><span className="badge badge-neutral">{user.role}</span></td>
                                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                </tr>
                            )) : (
                                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>No users found</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Drivers Tab */}
            {activeTab === 'drivers' && (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Vehicle</th>
                                <th>Plate</th>
                                <th>Rating</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {drivers.length > 0 ? drivers.map(driver => (
                                <tr key={driver._id}>
                                    <td>{driver.userId?.name || '—'}</td>
                                    <td style={{ textTransform: 'capitalize' }}>{driver.vehicleType} - {driver.vehicleModel}</td>
                                    <td>{driver.vehiclePlate}</td>
                                    <td>⭐ {driver.rating?.toFixed(1)}</td>
                                    <td>
                                        <span className={`badge ${driver.isVerified ? 'badge-success' : 'badge-warning'}`}>
                                            {driver.isVerified ? 'Verified' : 'Pending'}
                                        </span>
                                    </td>
                                    <td>
                                        {!driver.isVerified && (
                                            <button className="btn btn-success btn-sm" onClick={() => handleVerifyDriver(driver._id)}>
                                                Verify
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>No drivers found</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Rides Tab */}
            {activeTab === 'rides' && (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Rider</th>
                                <th>Pickup</th>
                                <th>Drop</th>
                                <th>Fare</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rides.length > 0 ? rides.map(ride => (
                                <tr key={ride._id}>
                                    <td>{ride.userId?.name || '—'}</td>
                                    <td>{ride.pickup?.address || '—'}</td>
                                    <td>{ride.drop?.address || '—'}</td>
                                    <td>₹{ride.fare}</td>
                                    <td>
                                        <span className={`badge ${ride.status === 'completed' ? 'badge-success' :
                                                ride.status === 'cancelled' ? 'badge-danger' : 'badge-warning'
                                            }`}>{ride.status}</span>
                                    </td>
                                    <td>{new Date(ride.createdAt).toLocaleDateString()}</td>
                                </tr>
                            )) : (
                                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>No rides found</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
