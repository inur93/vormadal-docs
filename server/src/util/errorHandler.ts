import {
    NextFunction, Request as ExRequest, Response as ExResponse
} from "express";
import { ValidateError } from "tsoa";
import { BaseError } from "../exceptions/baseException";

export function errorHandler(
    err: unknown,
    req: ExRequest,
    res: ExResponse,
    next: NextFunction
): ExResponse | void {

    if (err instanceof BaseError) {
        return res.status(err.status).json(err);
    }

    if (err instanceof ValidateError) {
        console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
        return res.status(422).json({
            message: "Validation Failed",
            code: "validation_error",
            details: err?.fields,
        });
    }
    if (err instanceof Error) {
        console.log('unknown error', err);
        return res.status(500).json({
            message: "Internal Server Error",
            code: "internal_server_error",
        });
    }

    next();
}