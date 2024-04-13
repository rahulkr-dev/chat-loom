import { Request } from "express";
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

export type TloginPayload = {
    email: string;
    password: string;
};

export interface Icookie {
    cl_accessToken: string;
}

export interface IrequestWithAuth extends Request {
    auth?: IjwtPayload;
    cookies: Icookie;
}

export type TpagenateQuery = {
    page: number;
    limit: number;
};
