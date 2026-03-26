import { useState } from "react";
import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { MapContainer, TileLayer } from "react-leaflet";
import { MapOverlayCard } from "./MapOverlayCard";
import { TrackedObjectMarker } from "./TrackedObjectMarker";
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
          <TrackedObjectMarker
            key={point.id}
            id={point.id}
            name={point.name}
            position={point.position}
            direction={point.direction}
            status={point.status}
          />
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
