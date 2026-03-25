export interface MapPoint {
  id: string;
  label: string;
  position: [number, number];
}

export const MAP_POINTS: MapPoint[] = [
  {
    id: "flying-object-start",
    label: "Flying Object",
    position: [50.4501, 30.5234]
  },
  {
    id: "walking-object-start",
    label: "Walking Object",
    position: [49.8397, 24.0297]
  }
];
