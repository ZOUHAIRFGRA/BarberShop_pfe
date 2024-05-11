import { useRef, useEffect } from 'react';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png'; 

const BarberLocationMap = ({ latitude, longitude, address }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([latitude || 33.545973, longitude || -7.624513], 10);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);
    }

    // Clear existing markers
    mapRef.current.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        mapRef.current.removeLayer(layer);
      }
    });

    // Add marker for barber's location
    if (latitude && longitude) {
      const barberIcon = L.icon({
        iconUrl: markerIcon,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      });

      L.marker([latitude, longitude], { icon: barberIcon }).addTo(mapRef.current)
        .bindPopup(address || 'Barber Location')
        .openPopup();
    }

    // Get user's location using Leaflet's locate() method
    mapRef.current.locate({ setView: true, maxZoom: 10 });

    // Handle location found event
    mapRef.current.on('locationfound', (e) => {
      const userIcon = L.icon({
        iconUrl: markerIcon,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      });

      L.marker(e.latlng, { icon: userIcon }).addTo(mapRef.current)
        .bindPopup('Your Location')
        .openPopup();
    });

  }, [latitude, longitude, address]);

  return <div id="map" style={{ height: '300px', width: '100%' }} />;
};

export default BarberLocationMap;
