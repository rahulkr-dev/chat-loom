import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";

class AuthController {
    constructor() {}

    async singup(req: Request, res: Response, next: NextFunction) {
        // Express validator
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return next(createHttpError(400, result.array()[0].msg as string));
        }
        return res.json({ data: req.body });
    }

    async login(req: Request, res: Response) {
        return res.json({ status: true });
    }
}

export default AuthController;
