export default function RideCard({ ride }) {
    const statusColors = {
        requested: 'badge-info',
        accepted: 'badge-warning',
        'in-progress': 'badge-warning',
        completed: 'badge-success',
        cancelled: 'badge-danger'
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            day: 'numeric', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div className="ride-card fade-in">
            <div className="ride-card-top">
                <div className="ride-locations">
                    <div className="ride-location">
                        <span className="dot pickup"></span>
                        <span>{ride.pickup?.address || 'Pickup location'}</span>
                    </div>
                    <div className="ride-location">
                        <span className="dot drop"></span>
                        <span>{ride.drop?.address || 'Drop location'}</span>
                    </div>
                </div>
                <span className={`badge ${statusColors[ride.status] || 'badge-neutral'}`}>
                    {ride.status}
                </span>
            </div>
            <div className="ride-card-bottom">
                <span>{formatDate(ride.createdAt)}</span>
                <span>{ride.distance} km • {ride.vehicleType}</span>
                <span className="ride-fare">₹{ride.fare}</span>
            </div>
        </div>
    );
}
