import jwt, { Secret } from "jsonwebtoken";
import config from "config";
import { IjwtPayload } from "../../authentication/auth-types";

export class TokenService {
    private accessTokenSecret: Secret;
    constructor(accessTokenSecret: Secret = config.get("accessToken.secret")) {
        this.accessTokenSecret = accessTokenSecret;
    }
    generateAccessToken(payload: IjwtPayload) {
        return jwt.sign(payload, this.accessTokenSecret, {
            expiresIn: "1h",
        });
    }
    verifyAccessToken(token: string) {
        return jwt.verify(token, this.accessTokenSecret);
    }
}
