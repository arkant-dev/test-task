export type ObjectStatus = "active" | "disabled";

export type Direction =
  | "North"
  | "North-East"
  | "East"
  | "South-East"
  | "South"
  | "South-West"
  | "West"
  | "North-West";

export interface Coordinate {
  lat: number;
  long: number;
}

export interface TrackedObject {
  id: string;
  name: string;
  coordinates: Coordinate[];
  direction: Direction;
  status: ObjectStatus;
}
