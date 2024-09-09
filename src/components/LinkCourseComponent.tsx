'use client'
import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import {db} from "../Firebase"
import { doc, getFirestore ,collection} from "firebase/firestore";
import { useCollectionData, useDocument } from 'react-firebase-hooks/firestore';


const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});
const Circle = dynamic(
  () => import("react-leaflet").then((mod) => mod.Circle),
  { ssr: false }
);

function LinkCourseComponent() {
  const [location, setLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({ latitude: null, longitude: null });
  const [balance, setBalance] = useState(10);
  const [error, setError] = useState<string | null>(null);
  const [hasArrived, setHasArrived] = useState(false);
  const [message, setMessage] = useState("");
  const [LIcon, setLIcon] = useState<{ userIcon: any; targetIcon: any }>({
    userIcon: null,
    targetIcon: null,
  });

  const [value, loading] = useDocument(
    doc(db, 'linkCourses', 'lqgqG5HZ8XnkCuZODqB2'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );


  

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

  const targetLocation = {
    latitude: 40.869805,
    longitude: 29.288917,
    radius: 0.1, // 100 metre (0.1 km)
  };

  useEffect(() => {
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
          },
          (error) => {
            setError(error.message);
          },
          { enableHighAccuracy: true }
        );
      } else {
        setError("Tarayıcı Geolocation API’sini desteklemiyor.");
      }
    };
    const intervalId = setInterval(updateLocation, 10000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Kullanıcı Konumu:", latitude, longitude); // Konsolda konumu kontrol edin
          setLocation({ latitude, longitude });

          if (hasArrived) {
            if (isInTargetLocation(latitude, longitude)) {
              setBalance((prevBalance) => prevBalance - 1); // Bakiye azaltılıyor
              setMessage("Ders kaydınız onaylandı!"); // Yeşil mesaj
            } else {
              setMessage("Derste değilsiniz."); // Kırmızı mesaj
            }
          }
        },
        (error) => {
          setError(error.message);
        },
        { enableHighAccuracy: true }
      );
    } else {
      setError("Tarayıcı Geolocation API’sini desteklemiyor.");
    }
  }, [hasArrived]);

  const isInTargetLocation = (userLat: number, userLng: number) => {
    const distance = calculateDistance(
      userLat,
      userLng,
      targetLocation.latitude,
      targetLocation.longitude
    );
    return distance <= targetLocation.radius;
  };

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };


  return (
   
    <div>
      
      

      <button
        className="bg-red-400 p-3"
        onClick={() => {
          setHasArrived(true);
        }}
        disabled={hasArrived}
      >
        Geldim
      </button>

      {message && (
        <p
          style={{
            color: message === "Ders kaydınız onaylandı!" ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}

      {error ? (
        <p>Hata: {error}</p>
      ) : (
        <>
          <p>Enlem: {location.latitude}</p>
          <p>Boylam: {location.longitude}</p>
          <p>Güncel Bakiye: {balance}</p>

          {location.latitude && location.longitude && (
            <MapContainer
              center={[location.latitude, location.longitude]}
              zoom={13}
              style={{ height: "400px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />

              <Marker
                position={[location.latitude, location.longitude]}
                icon={LIcon.userIcon}
              >
                <Popup>
                  Şu an buradasınız! <br /> Bakiye: {balance}
                </Popup>
              </Marker>

              <Marker
                position={[targetLocation.latitude, targetLocation.longitude]}
                icon={LIcon.targetIcon}
              >
                <Popup>Hedef Konum</Popup>
              </Marker>

              <Circle
                center={[targetLocation.latitude, targetLocation.longitude]}
                radius={targetLocation.radius * 1000}
                color="blue"
                fillColor="blue"
                fillOpacity={0.3}
              />
            </MapContainer>
          )}
        </>
      )}
    </div>
  );
}

export default LinkCourseComponent;
