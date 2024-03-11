import { JwtPayload } from "jsonwebtoken";

export interface Iuser {
    username: string;
    name: string;
    email: string;
    password: string;
}

export interface IjwtPayload extends JwtPayload {
    sub: string;
}
