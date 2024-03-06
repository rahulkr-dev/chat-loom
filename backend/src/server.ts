import config from "config";
import http from "http";
import app from "./app";
import logger from "./config/logger";
import { initDb } from "./config/db";
import SocketService from "./service/socket-service";

const socketService = new SocketService();

const startServer = async () => {
    const PORT: number = config.get("server.port") || 5502;
    try {
        const httpServer = http.createServer(app);
        socketService.io.attach(httpServer);
        await initDb();
        logger.info("Database connected successfully");

        httpServer.listen(PORT, () => logger.info(`Listening on port ${PORT}`));
    } catch (err: unknown) {
        if (err instanceof Error) {
            logger.error(err.message);
            logger.on("finish", () => {
                process.exit(1);
            });
        }
    }
};

void startServer();
