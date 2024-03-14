import { NextFunction, Response } from "express";
import createHttpError from "http-errors";
import { IjwtPayload, IrequestWithAuth } from "../../authentication/auth-types";
import { TokenService } from "../service/token-service";
import { ERROR_MESSAGES } from "../constants";

const tokenService = new TokenService();

const authenticate = (
    req: IrequestWithAuth,
    res: Response,
    next: NextFunction,
) => {
    try {
        const accessToken = req.cookies.cl_accessToken;
        if (!accessToken)
            return next(createHttpError(401, ERROR_MESSAGES.unauthorized));
        const payload = tokenService.verifyAccessToken(accessToken);
        if (!payload)
            return next(createHttpError(401, ERROR_MESSAGES.unauthorized));

        req.auth = payload as IjwtPayload;
        next();
    } catch (error) {
        next(createHttpError(401, ERROR_MESSAGES.unauthorized));
    }
};

export default authenticate;
