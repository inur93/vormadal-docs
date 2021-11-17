import * as express from "express";
import * as jwt from "jsonwebtoken";
import { UnauthorizedException } from "./exceptions/unauthorized";

function handleJwtToken(request: express.Request, scopes?: string[]): Promise<any> {
    const bearer = request.headers["authorization"] as string;
    const token = bearer && bearer.split(' ').length > 1 && bearer.split(' ')[1] || '';

    return new Promise((resolve, reject) => {
        if (!token) {
            reject(new UnauthorizedException(`No Token Provided`));
        }
        jwt.verify(token, process.env.JWT_SECRET || '', function (err: any, decoded: any) {
            if (err) {
                reject(new UnauthorizedException(err));
            } else {
                // Check if JWT contains all required scopes
                if (scopes) {
                    for (let scope of scopes) {
                        if (!decoded.roles?.includes(scope)) {
                            reject(new UnauthorizedException(`JWT does not contain required scope ${scope}`, scope));
                        }
                    }
                }
                resolve(decoded);
            }
        });
    });
}

export function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[]
): Promise<any> {
    if (securityName === "jwt") {
        return handleJwtToken(request, scopes);
    }

    return Promise.resolve();
}
