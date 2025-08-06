import { NextFunction, Response, Request } from "express";
import { jwtUtil } from "../utils";
import { UnauthorizedError } from "../errors";
import { AuthenticatedRequest } from "../types";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const token = (req.headers.authorization)?.split(" ")[1];

    if (!token) {
        throw new UnauthorizedError("Token is required");
    }

    try {
        const { data } = jwtUtil.verifyToken(token);
        (req as AuthenticatedRequest).user = data as any; // Cast to user object from JWT payload
        next();
    } catch (error) {
        next(error);
    }
}