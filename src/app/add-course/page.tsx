'use client'
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const useMapEvents = dynamic(() => import('react-leaflet').then(mod => mod.useMapEvents), { ssr: false });

export default function DraggableMarkerMap() {
  const [position, setPosition] = useState({ lat: 36.414250, lng: 34.062110 }); // Varsayılan pozisyon
  const [inputValues, setInputValues] = useState({
    lat: 36.414250,
    lng: 34.062110,
    courseName: '',
    teacherName: '',
    userId: ''
  });

  const [LIcon, setLIcon] = useState<{ userIcon: any; targetIcon: any }>({
    userIcon: null,
    targetIcon: null,
  });

  useEffect(() => {
    import("leaflet").then((mod) => {
      const userIcon = new mod.default.Icon({
        iconUrl:
          "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });
      const targetIcon = new mod.default.Icon({
        iconUrl:
          "https://cdn1.iconfinder.com/data/icons/web-55/32/web_1-512.png",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });
      setLIcon({ userIcon, targetIcon });
    });
  }, []);

  const updatePosition = (e) => {
    const newLat = e.target.getLatLng().lat;
    const newLng = e.target.getLatLng().lng;
    setPosition({ lat: newLat, lng: newLng });
    setInputValues({ ...inputValues, lat: newLat, lng: newLng });
  };

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition({ lat, lng });
        setInputValues({ ...inputValues, lat, lng });
      },
    });
    return null;
  };

  const handleChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", inputValues);
  };

  return (
    <div>
      <h1>Course Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Latitude:</label>
          <input type="text" name="lat" value={inputValues.lat} readOnly />
        </div>
        <div>
          <label>Longitude:</label>
          <input type="text" name="lng" value={inputValues.lng} readOnly />
        </div>
        <div>
          <label>Course Name:</label>
          <input
            type="text"
            name="courseName"
            value={inputValues.courseName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Teacher Name:</label>
          <input
            type="text"
            name="teacherName"
            value={inputValues.teacherName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>User ID:</label>
          <input
            type="text"
            name="userId"
            value={inputValues.userId}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {/* Harita Bileşeni */}
      <MapContainer center={[position.lat, position.lng]} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <Marker
          position={[position.lat, position.lng]}
          draggable={true}
          eventHandlers={{
            dragend: updatePosition,
          }}
          icon={LIcon.targetIcon}
        >
          <Popup>Current location</Popup>
        </Marker>

        <MapClickHandler />
      </MapContainer>
    </div>
  );
}
