export default function MapPlaceholder({ height = '400px', label = 'Live Map' }) {
    return (
        <div className="map-placeholder" style={{ height }}>
            <div className="map-icon">📍</div>
            <p>{label}</p>
            <p style={{ fontSize: '0.75rem', marginTop: '4px', opacity: 0.6 }}>
                Map integration ready
            </p>
        </div>
    );
}
