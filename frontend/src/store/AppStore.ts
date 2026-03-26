import { makeAutoObservable } from "mobx";
import { ObjectsUpdateMessage } from "../types/trackedObject";
import { mapStore } from "./MapStore";

const DEFAULT_WS_URL = "ws://localhost:8080";

export class AppStore {
  public connectionStatus: "idle" | "connecting" | "connected" | "error" = "idle";
  public errorMessage = "";
  private socket: WebSocket | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  public connect(): void {
    if (this.socket &&
        (this.socket.readyState === WebSocket.OPEN
        || this.socket.readyState === WebSocket.CONNECTING)) {
      return;
    }

    this.connectionStatus = "connecting";
    this.errorMessage = "";

    this.socket = new WebSocket(process.env.REACT_APP_WS_URL ?? DEFAULT_WS_URL);
    this.socket.onopen = this.handleOpen;
    this.socket.onmessage = this.handleMessage;
    this.socket.onerror = this.handleError;
    this.socket.onclose = this.handleClose;
  }

  public disconnect(): void {
    if (!this.socket) {
      return;
    }

    this.socket.onopen = null;
    this.socket.onmessage = null;
    this.socket.onerror = null;
    this.socket.onclose = null;
    this.socket.close();
    this.socket = null;
    this.connectionStatus = "idle";
    mapStore.clearObjects();
  }

  private handleOpen(): void {
    this.connectionStatus = "connected";
  }

  private handleMessage(event: MessageEvent<string>): void {
    try {
      const payload = JSON.parse(event.data) as ObjectsUpdateMessage;

      if (payload.type === "objects:update") {
        mapStore.fetchObjects(payload.data);
      }
    } catch (error) {
      this.connectionStatus = "error";
      this.errorMessage = error instanceof Error ? error.message : "Failed to parse websocket data";
    }
  }

  private handleError(): void {
    this.connectionStatus = "error";
    this.errorMessage = "WebSocket connection failed";
  }

  private handleClose(): void {
    if (this.connectionStatus !== "error") {
      this.connectionStatus = "idle";
    }

    this.socket = null;
    mapStore.clearObjects();
  }
}

export const appStore = new AppStore();
