export default function DriverCard({ driver }) {
    return (
        <div className="driver-card fade-in">
            <div className="driver-avatar">🚗</div>
            <div className="driver-info">
                <h4>{driver.userId?.name || 'Driver'}</h4>
                <p>{driver.vehicleModel} • {driver.vehiclePlate}</p>
                <p style={{ textTransform: 'capitalize' }}>{driver.vehicleType}</p>
            </div>
            <div className="driver-rating">
                ⭐ {driver.rating?.toFixed(1) || '4.5'}
            </div>
        </div>
    );
}
