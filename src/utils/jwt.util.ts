import jwt from "jsonwebtoken"

export const veriftyToken = (token : string) => {
    return jwt.verify(token , String(process.env.JWT_SECRET))
}