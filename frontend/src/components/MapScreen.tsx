import { useState } from "react";
import { Box } from "@mui/material";
import { CircleMarker, MapContainer, TileLayer, Tooltip } from "react-leaflet";
import { MapOverlayCard } from "./MapOverlayCard";
import { MAP_POINTS } from "../constants/mapPoints";
import "leaflet/dist/leaflet.css";
import "./MapScreen.css";

const mapCenter: [number, number] = [50.2441, 27.27655];

export const MapScreen = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(true);

  return (
    <Box className="map-screen">
      <MapContainer center={mapCenter} zoom={7} className="map-screen__map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {MAP_POINTS.map((point) => (
          <CircleMarker
            key={point.id}
            center={point.position}
            radius={12}
            pathOptions={{
              color: point.id.includes("flying") ? "#ff7c43" : "#2a9d8f",
              fillColor: point.id.includes("flying") ? "#ffb997" : "#9be7da",
              fillOpacity: 0.9,
              weight: 3
            }}
          >
            <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
              {point.label}
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>

      {isOverlayOpen ? (
        <MapOverlayCard
          title="Початкові об'єкти вже на мапі"
          text="На екрані відображені дві стартові точки. Далі цей компонент можна підключити до websocket із папки server для live-оновлень."
          onClose={() => setIsOverlayOpen(false)}
        />
      ) : null}
    </Box>
  );
};
