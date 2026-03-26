import { Marker, Tooltip } from "react-leaflet";
import { divIcon, point } from "leaflet";
import { useTrackedTriangleMarker } from "../hooks/useTrackedTriangleMarker";
import { Direction, ObjectStatus } from "../types/trackedObject";

interface TrackedObjectMarkerProps {
  id: string;
  name: string;
  position: [number, number];
  direction: Direction;
  status: ObjectStatus;
}

const createTriangleIcon = (
  id: string,
  rotation: number,
  markerColor: string,
  markerAccentColor: string
) =>
  divIcon({
    className: "tracked-object-marker-icon",
    iconSize: point(28, 40),
    iconAnchor: point(14, 20),
    html: `
      <div class="tracked-object-marker" data-marker-id="${id}" style="transform: rotate(${rotation}deg);">
        <svg viewBox="0 0 28 40" class="tracked-object-marker__svg" aria-hidden="true">
          <polygon
            points="14,2 25,36 14,28 3,36"
            fill="${markerColor}"
            stroke="${markerAccentColor}"
            stroke-width="2"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    `
  });

export const TrackedObjectMarker = ({
  id,
  name,
  position,
  direction,
  status
}: TrackedObjectMarkerProps) => {
  const { rotation, markerColor, markerAccentColor, markerLabel } = useTrackedTriangleMarker({
    id,
    name,
    direction,
    status
  });

  return (
    <Marker
      position={position}
      icon={createTriangleIcon(id, rotation, markerColor, markerAccentColor)}
    >
      <Tooltip direction="top" offset={[0, -14]} opacity={1} permanent>
        {markerLabel}
      </Tooltip>
    </Marker>
  );
};
