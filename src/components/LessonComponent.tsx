'use client'

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Kendi marker ikonlarını oluştur
const userIcon = new L.Icon({
  iconUrl:
    "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png",
  iconSize: [40, 40], // İkonun boyutu
  iconAnchor: [20, 40], // İkonun harita üzerindeki nokta ile hizalanması
  popupAnchor: [0, -40], // Popup'ın pozisyonunu ayarlamak için
});

const targetIcon = new L.Icon({
  iconUrl: "https://cdn1.iconfinder.com/data/icons/web-55/32/web_1-512.png",
  iconSize: [40, 40], // İkonun boyutu
  iconAnchor: [20, 40], // İkonun harita üzerindeki nokta ile hizalanması
  popupAnchor: [0, -40], // Popup'ın pozisyonunu ayarlamak için
});

function LessonCommponent() {
  const [location, setLocation] = useState<{latitude: number | null,longitude: number| null }>({ latitude: null, longitude: null });
  const [balance, setBalance] = useState(10); // Başlangıç bakiyesi
  const [error, setError] = useState<string | null>(null);
  const [hasArrived, setHasArrived] = useState(false); // "Geldim" butonunun durumu
  const [message, setMessage] = useState(""); // Durum mesajı

  // Yeni hedeflenen konum (36°24'51.3"N 34°03'43.6"E → 36.414250, 34.062111)
  const targetLocation = {
    latitude: 36.41425,
    longitude: 34.062111,
    radius: 0.1, // 100 metre (0.1 km)
  };

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

  // Belirtilen konumla kullanıcının konumunu karşılaştırma
  const isInTargetLocation = (userLat : number, userLng: number) => {
    const distance = calculateDistance(
      userLat,
      userLng,
      targetLocation.latitude,
      targetLocation.longitude
    );
    return distance <= targetLocation.radius;
  };

  // Haversine formülü ile iki koordinat arasındaki mesafeyi hesaplama
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Dünya'nın yarıçapı (km)
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Mesafe (km)
    return distance;
  };

  // Dereceyi radyana çevirme
  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  return (
    <div>
      <h1>Ders Bilgileri</h1>
      <p>Ders Adı: Tiyatro</p>
      <p>Ders Zamanı: 30.08.2024</p>

      {/* Geldim butonu */}
      <button
        className="bg-red-400 p-3"
        onClick={() => {
          setHasArrived(true);
        }}
        disabled={hasArrived} // Buton devre dışı bırakılır
      >
        Geldim
      </button>

      {/* Durum mesajı */}
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

              {/* Kullanıcının konumunu gösteren özel ikonlu marker */}
              <Marker
                position={[location.latitude, location.longitude]}
                icon={userIcon} // Kullanıcı için özel ikon
              >
                <Popup>
                  Şu an buradasınız! <br /> Bakiye: {balance}
                </Popup>
              </Marker>

              {/* Hedef konumu gösteren özel ikonlu marker */}
              <Marker
                position={[targetLocation.latitude, targetLocation.longitude]}
                icon={targetIcon} // Hedef için özel ikon
              >
                <Popup>Hedef Konum</Popup>
              </Marker>

              {/* Hedef konum etrafında mavi çember */}
              <Circle
                center={[targetLocation.latitude, targetLocation.longitude]}
                radius={targetLocation.radius * 1000} // Çemberin çapı (metre cinsinden)
                color="blue"
                fillColor="blue"
                fillOpacity={0.3} // Çemberin iç renginin şeffaflığı
              />
            </MapContainer>
          )}
        </>
      )}
    </div>
  );
}

export default LessonCommponent;
