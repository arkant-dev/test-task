import { WebSocket, WebSocketServer } from "ws";
import { ObjectTracker } from "../core/objectTracker";

const BROADCAST_INTERVAL_MS = 1_000;

export const createSocketServer = (
  port: number,
  objectTracker: ObjectTracker
): WebSocketServer => {
  const socketServer = new WebSocketServer({ port });

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
