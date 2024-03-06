import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./common/middlewares/globalErrorHandler";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello from Chat loom!" });
});

app.use(globalErrorHandler);

export default app;
