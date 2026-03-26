import { useState } from "react";
import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { CircleMarker, MapContainer, TileLayer, Tooltip } from "react-leaflet";
import { MapOverlayCard } from "./MapOverlayCard";
import { appStore } from "../store/AppStore";
import { mapStore } from "../store/MapStore";
import "leaflet/dist/leaflet.css";
import "./MapScreen.css";

export const MapScreen = observer(() => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(true);

  return (
    <Box className="map-screen">
      <MapContainer center={mapStore.mapCenter} zoom={7} className="map-screen__map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {mapStore.latestCoordinates.map((point) => (
          <CircleMarker
            key={point.id}
            center={point.position}
            radius={12}
            pathOptions={{
              color:
                point.status === "disabled"
                  ? "#7a7f87"
                  : point.id.includes("flying")
                    ? "#ff7c43"
                    : "#2a9d8f",
              fillColor:
                point.status === "disabled"
                  ? "#b6bbc4"
                  : point.id.includes("flying")
                    ? "#ffb997"
                    : "#9be7da",
              fillOpacity: 0.9,
              weight: 3
            }}
          >
            <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
              {point.status === "disabled"
                ? `${point.name} | Втрачено зв'язок`
                : `${point.name} | ${point.direction}`}
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>

      {isOverlayOpen ? (
        <MapOverlayCard
          title="Дані з websocket вже на мапі"
          text={`Статус з'єднання: ${appStore.connectionStatus}. Активних об'єктів: ${mapStore.activeObjectsCount}. Втрачених: ${mapStore.disabledObjectsCount}.`}
          onClose={() => setIsOverlayOpen(false)}
        />
      ) : null}
    </Box>
  );
});
