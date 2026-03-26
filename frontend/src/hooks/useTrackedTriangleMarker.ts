import { Direction, ObjectStatus } from "../types/trackedObject";

const DIRECTION_ROTATION_MAP: Record<Direction, number> = {
  North: 0,
  "North-East": 45,
  East: 90,
  "South-East": 135,
  South: 180,
  "South-West": 225,
  West: 270,
  "North-West": 315
};

interface UseTrackedTriangleMarkerParams {
  id: string;
  name: string;
  direction: Direction;
  status: ObjectStatus;
}

export const useTrackedTriangleMarker = ({
  id,
  name,
  direction,
  status
}: UseTrackedTriangleMarkerParams) => {
  const isDisabled = status === "disabled";

  return {
    rotation: DIRECTION_ROTATION_MAP[direction],
    isDisabled,
    markerColor: isDisabled ? "#b6bbc4" : id.includes("flying") ? "#ffb997" : "#9be7da",
    markerAccentColor: isDisabled ? "#7a7f87" : id.includes("flying") ? "#ff7c43" : "#2a9d8f",
    markerLabel: isDisabled ? `${name} | Втрачено зв'язок` : `${name} | ${direction}`
  };
};
