import cors from "cors";
import config from "config";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./common/middlewares/globalErrorHandler";
import authRouter from "./authentication/auth-route";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: [config.get("frontend.url")], credentials: true }));

app.use("/api/auth", authRouter);

app.get("/api/test", (req: Request, res: Response) => {
    res.json({ message: "Hello from Chat loom!" });
});

app.use(globalErrorHandler);

export default app;
