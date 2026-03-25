import { TrackedObject } from "../types";

const DEFAULT_DIRECTION = "North";

export const MAX_OBJECTS = 200;

export const INITIAL_OBJECTS: TrackedObject[] = [
  {
    id: "1",
    name: "Flying Object",
    coordinates: [
      {
        lat: 50.4501,
        long: 30.5234
      }
    ],
    direction: DEFAULT_DIRECTION,
    status: "active"
  },
  {
    id: "2",
    name: "Walking Object",
    coordinates: [
      {
        lat: 49.8397,
        long: 24.0297
      }
    ],
    direction: DEFAULT_DIRECTION,
    status: "active"
  }
];

export const createInitialObjects = (): TrackedObject[] => {
  return Array.from({ length: MAX_OBJECTS }, (_, index) => {
    if (index < INITIAL_OBJECTS.length) {
      return {
        ...INITIAL_OBJECTS[index],
        coordinates: [...INITIAL_OBJECTS[index].coordinates]
      };
    }

    const baseObject = INITIAL_OBJECTS[index % INITIAL_OBJECTS.length];
    const offset = (index + 1) * 0.01;

    return {
      ...baseObject,
      id: `${index + 1}`,
      name: `${baseObject.name} ${index + 1}`,
      coordinates: [
        {
          lat: Number((baseObject.coordinates[0].lat + offset).toFixed(6)),
          long: Number((baseObject.coordinates[0].long + offset).toFixed(6))
        }
      ],
      direction: DEFAULT_DIRECTION,
      status: "active"
    };
  });
};
