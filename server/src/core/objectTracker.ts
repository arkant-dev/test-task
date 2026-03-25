import { Direction, Coordinate, TrackedObject } from "../types";

const COORDINATE_UPDATE_INTERVAL_MS = 1_000;
const DISABLE_TIMEOUT_MIN_MS = 30_000;
const DISABLE_TIMEOUT_MAX_MS = 120_000;

const roundCoordinate = (value: number): number => Number(value.toFixed(6));

export const getNextCoordinate = (lastCoordinate: Coordinate): Coordinate => {
  const latDelta = (Math.random() - 0.5) * 0.02;
  const longDelta = (Math.random() - 0.5) * 0.02;

  return {
    lat: roundCoordinate(lastCoordinate.lat + latDelta),
    long: roundCoordinate(lastCoordinate.long + longDelta)
  };
};

export const getDirectionFromCoordinates = (
  previousCoordinate: Coordinate,
  nextCoordinate: Coordinate
): Direction => {
  const latDiff = nextCoordinate.lat - previousCoordinate.lat;
  const longDiff = nextCoordinate.long - previousCoordinate.long;

  const vertical =
    latDiff > 0 ? "North" : latDiff < 0 ? "South" : "";
  const horizontal =
    longDiff > 0 ? "East" : longDiff < 0 ? "West" : "";

  if (vertical && horizontal) {
    return `${vertical}-${horizontal}` as Direction;
  }

  if (vertical) {
    return vertical as Direction;
  }

  if (horizontal) {
    return horizontal as Direction;
  }

  return "North";
};

const createDisableTimeout = (callback: () => void): NodeJS.Timeout => {
  const randomDelay =
    Math.floor(Math.random() * (DISABLE_TIMEOUT_MAX_MS - DISABLE_TIMEOUT_MIN_MS + 1)) +
    DISABLE_TIMEOUT_MIN_MS;

  return setTimeout(() => {
    callback();
  }, randomDelay);
};

export class ObjectTracker {
  private readonly objects = new Map<string, TrackedObject>();
  private readonly updateTimers = new Map<string, NodeJS.Timeout>();
  private readonly disableTimers = new Map<string, NodeJS.Timeout>();

  constructor(initialObjects: TrackedObject[]) {
    initialObjects.forEach((trackedObject) => {
      this.objects.set(trackedObject.id, trackedObject);
      this.startTracking(trackedObject.id);
    });
  }

  public getActiveObjects(): TrackedObject[] {
    return Array.from(this.objects.values())
      .filter((trackedObject) => trackedObject.status === "active")
      .map((trackedObject) => ({
        ...trackedObject,
        coordinates: [...trackedObject.coordinates]
      }));
  }

  public stop(): void {
    this.updateTimers.forEach((timer) => clearInterval(timer));
    this.disableTimers.forEach((timer) => clearTimeout(timer));
    this.updateTimers.clear();
    this.disableTimers.clear();
  }

  private startTracking(objectId: string): void {
    const trackedObject = this.objects.get(objectId);

    if (!trackedObject || trackedObject.status === "disabled") {
      return;
    }

    const updateTimer = setInterval(() => {
      this.updateObjectPosition(objectId);
    }, COORDINATE_UPDATE_INTERVAL_MS);

    const disableTimer = createDisableTimeout(() => {
      this.disableObject(objectId);
    });

    this.updateTimers.set(objectId, updateTimer);
    this.disableTimers.set(objectId, disableTimer);
  }

  private updateObjectPosition(objectId: string): void {
    const trackedObject = this.objects.get(objectId);

    if (!trackedObject || trackedObject.status === "disabled") {
      return;
    }

    const lastCoordinate = trackedObject.coordinates[trackedObject.coordinates.length - 1];
    const nextCoordinate = getNextCoordinate(lastCoordinate);
    const nextDirection = getDirectionFromCoordinates(lastCoordinate, nextCoordinate);

    trackedObject.coordinates.push(nextCoordinate);
    trackedObject.direction = nextDirection;
  }

  private disableObject(objectId: string): void {
    const trackedObject = this.objects.get(objectId);

    if (!trackedObject) {
      return;
    }

    trackedObject.status = "disabled";

    const updateTimer = this.updateTimers.get(objectId);
    const disableTimer = this.disableTimers.get(objectId);

    if (updateTimer) {
      clearInterval(updateTimer);
      this.updateTimers.delete(objectId);
    }

    if (disableTimer) {
      clearTimeout(disableTimer);
      this.disableTimers.delete(objectId);
    }

    this.objects.delete(objectId);
  }
}
