import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Nav from '../components/Nav.jsx';
import { IoMdHome } from "react-icons/io";
import { IoAddCircle } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

// Hook pour centrer la map sur la position
function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position);
  }, [position]);
  return null;
}

export default function Home() {
  const [position, setPosition] = useState([50.4300, 2.7800]); // fallback
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 5000
      }
    );

    return () => navigator.geolocation.clearWatch(watchId); // clean up
  }, []);

  if (loading) return <p>Localisation en cours...</p>;

  return (
    <div>
      <MapContainer center={position} zoom={13} style={{ height: '100vh', width: '100vw'}}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={position}>
          <Popup>Vous êtes ici !</Popup>
        </Marker>
        <RecenterMap position={position} />
      </MapContainer>
    </div>
  );
}
