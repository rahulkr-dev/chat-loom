import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import AuthService from "./auth-service";
import { IjwtPayload, IrequestWithAuth, Iuser, TloginPayload } from "./auth-types";
import { CredentialService } from "../common/service/credential-service";
import { TokenService } from "../common/service/token-service";
import { ERROR_MESSAGES } from "../common/constants";
class AuthController {
    constructor(
        private authService: AuthService,
        private credentialService: CredentialService,
        private tokenService: TokenService,
    ) {}

    singup = async (req: Request, res: Response, next: NextFunction) => {
        // Express validator
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return next(createHttpError(400, result.array()[0].msg as string));
        }
        const { username, email, password, name } = req.body as Iuser;
        const isUsernameExist = await this.authService.getUserByUsername(username);
        if (isUsernameExist) return next(createHttpError(400, ERROR_MESSAGES.usernameExists));
        const isEmailExist = await this.authService.getUserByEmail(email);
        if (isEmailExist) return next(createHttpError(400, ERROR_MESSAGES.emailExists));

        const hash = await this.credentialService.convertToHash(password);
        const user = await this.authService.create({
            name,
            username,
            email,
            password: hash,
        });
        const payload: IjwtPayload = { sub: user._id.toString() };

        const accessToken = this.tokenService.generateAccessToken(payload);
        res.cookie("cl_accessToken", accessToken, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60, // 1h
        });

        return res.json({ id: user._id });
    };

    login = async (req: Request, res: Response, next: NextFunction) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return next(createHttpError(400, result.array()[0].msg as string));
        }
        const { email, password } = req.body as TloginPayload;
        const user = await this.authService.getUserByEmail(email);
        if (!user) return next(createHttpError(400, ERROR_MESSAGES.invalidCredentials));
        const isMatch = await this.credentialService.comparePassword(password, user.password);
        if (!isMatch) return next(createHttpError(400, ERROR_MESSAGES.invalidCredentials));

        const payload: IjwtPayload = { sub: user._id.toString() };
        const accessToken = this.tokenService.generateAccessToken(payload);
        res.cookie("cl_accessToken", accessToken, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60,
        });

        return res.json({ id: user._id });
    };

    self = async (req: IrequestWithAuth, res: Response, next: NextFunction) => {
        const auth = req.auth as IjwtPayload;
        const user = await this.authService.getUserById(auth.sub);
        if (!user) return next(createHttpError(401, ERROR_MESSAGES.unauthorized));
        return res.json({ user });
    };

    logout = async (req: Request, res: Response) => {
        res.clearCookie("cl_accessToken");
        res.sendStatus(200);
    };

    getUsers = async (req: Request, res: Response) => {
        const { q = "", page, limit } = req.query;
        const users = await this.authService.getUsers(q as string, {
            page: page ? parseInt(page as string) : 1,
            limit: limit ? parseInt(limit as string) : 10,
        });
        res.json(users);
    };
}

export default AuthController;
