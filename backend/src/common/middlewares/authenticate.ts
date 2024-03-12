import { NextFunction, Response } from "express";
import { IjwtPayload, IrequestWithAuth } from "../../authentication/auth-types";
import { TokenService } from "../service/token-service";
import createHttpError from "http-errors";

const tokenService = new TokenService();

const authenticate = (
    req: IrequestWithAuth,
    res: Response,
    next: NextFunction,
) => {
    try {
        const accessToken = req.cookies.cl_accessToken;
        if (!accessToken) return next(createHttpError(401, "unauthorize"));
        const payload = tokenService.verifyAccessToken(accessToken);
        if (!payload) return next(createHttpError(401, "unauthorize"));

        req.auth = payload as IjwtPayload;
        next();
    } catch (error) {
        next(createHttpError(401, "unauthorize"));
    }
};

export default authenticate;
