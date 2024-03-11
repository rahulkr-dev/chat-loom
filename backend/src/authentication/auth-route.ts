import { Router } from "express";
import AuthController from "./auth-controller";
import { asyncWrapper } from "../common/utils/wrapper";
import authValidator from "./auth-validator";
import AuthService from "./auth-service";
import { CredentialService } from "../common/service/credential-service";
import { TokenService } from "../common/service/token-service";

const authRouter = Router();
const authService = new AuthService();
const credentialService = new CredentialService();
const tokenService = new TokenService();

const { singup } = new AuthController(
    authService,
    credentialService,
    tokenService,
);

authRouter.post("/signup", authValidator, asyncWrapper(singup));
authRouter.get("/login", asyncWrapper(singup));

export default authRouter;
