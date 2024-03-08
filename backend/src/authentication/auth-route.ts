import { Router } from "express";
import AuthController from "./auth-controller";
import { asyncWrapper } from "../common/utils/wrapper";
import authValidator from "./auth-validator";

const authRouter = Router();

const { singup } = new AuthController();

authRouter.post("/signup", authValidator, asyncWrapper(singup));
authRouter.get("/login", asyncWrapper(singup));

export default authRouter;
