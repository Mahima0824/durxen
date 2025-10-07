import React, { useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const EventMap = ({ events = [] }) => {
    const mapRef = useRef(null);

    // Default center (can be adjusted based on your needs)
    const defaultCenter = [20.5937, 78.9629]; // Center of India
    const zoom = 5;

    return (
        <div className="event-map-container" style={{ height: '380px', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
            <MapContainer center={defaultCenter} zoom={zoom} style={{ height: '100%', width: '100%' }} ref={mapRef} zoomControl={true} scrollWheelZoom={false}>
                <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" attribution='&copy; <a href="https://carto.com/">CARTO</a>' />

                {events && events.length > 0 && events.map((event, index) => (
                    <Marker key={index} position={event.coordinates}>
                        <Popup>
                            <div>
                                <h6 className="mb-1">{event.name}</h6>
                                <p className="mb-0">{event.location}</p>
                                <small className="text-muted">{event.date}</small>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default EventMap;

