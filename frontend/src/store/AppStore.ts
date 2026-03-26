import { makeAutoObservable } from "mobx";
import { ObjectsUpdateMessage } from "../types/trackedObject";
import { mapStore } from "./MapStore";

const DEFAULT_WS_URL = "ws://localhost:8080";

export class AppStore {
  public connectionStatus: "idle" | "connecting" | "connected" | "error" = "idle";
  public errorMessage = "";
  public authKey = "";
  private socket: WebSocket | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  public setAuthKey(value: string): void {
    this.authKey = value;
  }

  public async connect(authKey: string): Promise<boolean> {
    const normalizedKey = authKey.trim();

    if (!normalizedKey) {
      this.connectionStatus = "error";
      this.errorMessage = "Введіть ключ доступу";
      return false;
    }

    if (
      this.socket &&
      (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)
    ) {
      return this.connectionStatus === "connected";
    }

    this.authKey = normalizedKey;
    this.connectionStatus = "connecting";
    this.errorMessage = "";

    return new Promise((resolve) => {
      let isResolved = false;
      let hasOpened = false;
      const socketUrl = new URL(process.env.REACT_APP_WS_URL ?? DEFAULT_WS_URL);

      socketUrl.searchParams.set("key", normalizedKey);

      this.socket = new WebSocket(socketUrl.toString());

      this.socket.onopen = () => {
        hasOpened = true;
        this.handleOpen();

        if (!isResolved) {
          isResolved = true;
          resolve(true);
        }
      };

      this.socket.onmessage = this.handleMessage;

      this.socket.onerror = () => {
        this.handleError();

        if (!isResolved) {
          isResolved = true;
          resolve(false);
        }
      };

      this.socket.onclose = () => {
        this.handleClose(hasOpened);

        if (!isResolved) {
          isResolved = true;
          resolve(false);
        }
      };
    });
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
    this.errorMessage = "";
    mapStore.clearObjects();
  }

  private handleOpen(): void {
    this.connectionStatus = "connected";
    this.errorMessage = "";
  }

  private handleMessage(event: MessageEvent<string>): void {
    try {
      const payload = JSON.parse(event.data) as ObjectsUpdateMessage;

      if (payload.type === "objects:update") {
        mapStore.fetchObjects(payload.data);
      }
    } catch (error) {
      this.connectionStatus = "error";
      this.errorMessage = error instanceof Error ? error.message : "Не вдалося обробити дані websocket";
    }
  }

  private handleError(): void {
    this.connectionStatus = "error";
    this.errorMessage = "Невірний ключ доступу або сервер недоступний";
  }

  private handleClose(hasOpened: boolean): void {
    if (!hasOpened) {
      this.connectionStatus = "error";
      this.errorMessage = "Невірний ключ доступу або сервер недоступний";
    } else if (this.connectionStatus !== "error") {
      this.connectionStatus = "idle";
    }

    this.socket = null;
    mapStore.clearObjects();
  }
}

export const appStore = new AppStore();
