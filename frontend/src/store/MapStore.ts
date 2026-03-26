import { makeAutoObservable } from "mobx";
import { TrackedObject } from "../types/trackedObject";

const DEFAULT_MAP_CENTER: [number, number] = [50.2441, 27.27655];

export class MapStore {
  public mapCenter: [number, number] = DEFAULT_MAP_CENTER;
  public objectsData: TrackedObject[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  public fetchObjects(objects: TrackedObject[]): void {
    this.objectsData = objects;

    const firstObjectCoordinate = this.latestCoordinates[0];

    if (firstObjectCoordinate) {
      this.mapCenter = firstObjectCoordinate.position;
      return;
    }

    this.mapCenter = DEFAULT_MAP_CENTER;
  }

  public clearObjects(): void {
    this.objectsData = [];
    this.mapCenter = DEFAULT_MAP_CENTER;
  }
 
  public get latestCoordinates(): Array<{
    id: string;
    name: string;
    position: [number, number];
    direction: TrackedObject["direction"];
    status: TrackedObject["status"];
  }> {
    return this.objectsData
      .map((trackedObject) => {
        const lastCoordinate = trackedObject.coordinates[trackedObject.coordinates.length - 1];

        if (!lastCoordinate) {
          return null;
        }

        return {
          id: trackedObject.id,
          name: trackedObject.name,
          position: [lastCoordinate.lat, lastCoordinate.long] as [number, number],
          direction: trackedObject.direction,
          status: trackedObject.status
        };
      })
      .filter(
        (
          trackedObject
        ): trackedObject is {
          id: string;
          name: string;
          position: [number, number];
          direction: TrackedObject["direction"];
          status: TrackedObject["status"];
        } => trackedObject !== null
      );
  }

  public get activeObjectsCount(): number {
    return this.objectsData.filter((trackedObject) => trackedObject.status === "active").length;
  }

  public get disabledObjectsCount(): number {
    return this.objectsData.filter((trackedObject) => trackedObject.status === "disabled").length;
  }
}

export const mapStore = new MapStore();
