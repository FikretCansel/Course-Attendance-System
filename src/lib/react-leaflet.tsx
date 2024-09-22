import dynamic from "next/dynamic";

export const importReaflet = () => {
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
  const Popup = dynamic(
    () => import("react-leaflet").then((mod) => mod.Popup),
    {
      ssr: false,
    }
  );
  const Circle = dynamic(
    () => import("react-leaflet").then((mod) => mod.Circle),
    { ssr: false }
  );

  return { MapContainer, TileLayer, Marker, Popup, Circle };
};
