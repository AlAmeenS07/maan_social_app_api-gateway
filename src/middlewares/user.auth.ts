import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { veriftyToken } from "../utils/jwt.util";
import { INVALID_USER, SOMETHING_ERROR, TOKEN_MISSING } from "../utils/constants";
import { errorResponse } from "../utils/response.handle";


export const tempTokenCheck = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { tempToken } = req.cookies

        if (!tempToken) {
            return errorResponse(TOKEN_MISSING, 401)
        }

        const decoded = veriftyToken(tempToken) as JwtPayload

        if (decoded.role != "user") {
            return errorResponse(INVALID_USER, 400)
        }

        (req as any).userId = decoded.userId

        next()

    } catch (error: unknown) {
        if (error instanceof Error) {
            return errorResponse(error.message, 500)
        }
        return errorResponse(SOMETHING_ERROR, 500)
    }
}


export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]

        if (!token) {
            return errorResponse(TOKEN_MISSING, 401)
        }

        const decoded = veriftyToken(token) as JwtPayload

        (req as any).userId = decoded.userId

        next()

    } catch (error: unknown) {
        if (error instanceof Error) {
            return errorResponse(error.message, 500)
        }
        return errorResponse(SOMETHING_ERROR, 500)
    }
}


export const adminAuthCheck = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const token = req.headers.authorization?.split(" ")[1]

        if (!token) {
            return errorResponse(TOKEN_MISSING, 401)
        }

        const decoded = veriftyToken(token) as JwtPayload

        if(decoded.role != "admin"){
            return errorResponse(INVALID_USER , 403)
        }

        (req as any).userId = decoded.userId

        next()

    } catch (error) {
        if (error instanceof Error) {
            return errorResponse(error.message, 500)
        }
        return errorResponse(SOMETHING_ERROR, 500)
    }
}