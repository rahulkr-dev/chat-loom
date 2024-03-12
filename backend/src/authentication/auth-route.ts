import { Router } from "express";
import AuthController from "./auth-controller";
import { asyncWrapper } from "../common/utils/wrapper";
import AuthService from "./auth-service";
import { CredentialService } from "../common/service/credential-service";
import { TokenService } from "../common/service/token-service";
import { loginValidator, singupValidator } from "./auth-validator";
import authenticate from "../common/middlewares/authenticate";

const authRouter = Router();
const authService = new AuthService();
const credentialService = new CredentialService();
const tokenService = new TokenService();

const authController = new AuthController(
    authService,
    credentialService,
    tokenService,
);

authRouter.post(
    "/signup",
    singupValidator,
    asyncWrapper(authController.singup),
);
authRouter.post("/login", loginValidator, asyncWrapper(authController.login));
authRouter.get("/self", authenticate, asyncWrapper(authController.self));

export default authRouter;
