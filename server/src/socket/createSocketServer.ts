import { IncomingMessage } from "node:http";
import { WebSocket, WebSocketServer } from "ws";
import { ObjectTracker } from "../core/objectTracker";

const BROADCAST_INTERVAL_MS = 1_000;
const DEFAULT_HOST = "localhost";

const isAuthorized = (request: IncomingMessage, apiKey: string): boolean => {
  const url = new URL(request.url ?? "/", `ws://${request.headers.host ?? DEFAULT_HOST}`);

  return url.searchParams.get("key") === apiKey;
};

export const createSocketServer = (
  port: number,
  objectTracker: ObjectTracker,
  apiKey: string
): WebSocketServer => {
  const socketServer = new WebSocketServer({
    port,
    verifyClient: ({ req }: { req: IncomingMessage }) => isAuthorized(req, apiKey)
  });

  socketServer.on("connection", (socket) => {
    socket.send(
      JSON.stringify({
        type: "objects:update",
        data: objectTracker.getObjects()
      })
    );
  });

  const broadcastTimer = setInterval(() => {
    const payload = JSON.stringify({
      type: "objects:update",
      data: objectTracker.getObjects()
    });

    socketServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    });
  }, BROADCAST_INTERVAL_MS);

  socketServer.on("close", () => {
    clearInterval(broadcastTimer);
  });

  return socketServer;
};
