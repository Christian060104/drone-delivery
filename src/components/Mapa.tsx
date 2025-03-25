import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Importa Leaflet
import "leaflet/dist/leaflet.css";

// Definir el ícono personalizado

const homeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/69/69524.png", // URL de una casita
  iconSize: [40, 40], // Tamaño del ícono
  iconAnchor: [20, 40], // Punto donde se "ancla" en el mapa
  popupAnchor: [0, -40], // Posición del popup respecto al ícono
});

const Mapa = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error obteniendo ubicación:", error);
        }
      );
    } else {
      console.log("La geolocalización no es compatible con este navegador.");
    }
  }, []);

  return (
    <div>
      <h2>Mapa de Ubicación</h2>
      {location ? (
        <MapContainer
          center={[location.lat, location.lng]}
          zoom={15}
          style={{ height: "400px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[location.lat, location.lng]} icon={homeIcon}>
            <Popup>🏡 Estás aquí</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>Cargando ubicación...</p>
      )}
    </div>
  );
};

export default Mapa;
