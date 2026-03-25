import { createInitialObjects } from "./db/initialObjects";
import { ObjectTracker } from "./core/objectTracker";
import { createSocketServer } from "./socket/createSocketServer";

const PORT = Number(process.env.PORT ?? 8080);

const initialObjects = createInitialObjects();

const objectTracker = new ObjectTracker(initialObjects);
const socketServer = createSocketServer(PORT, objectTracker);

socketServer.on("listening", () => {
  console.log(
    `Mock websocket server is running on ws://localhost:${PORT} with ${initialObjects.length} objects`
  );
});

const shutdown = (): void => {
  objectTracker.stop();
  socketServer.close();
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
