
export const USER_SERVICE_URL : string = "http://user-service:5001"
export const MEDIA_SERVICE_URL : string = "http://media-service:5002"
export const POST_SERVICE_URL : string = "http://post-service:5003"

export const INTERNAL_SERVER_ERROR : string = "Server Error !"
export const TOKEN_MISSING : string = "Token missing !"
export const INVALID_USER : string = "Invalid User !"
export const SOMETHING_ERROR : string = "Something error !"
export const REQUEST_COMPLETED : string = "REQUEST_COMPLETED"
export const REQUEST_FAILED : string = "REQUEST_FAILED"

export enum statusCodes{
    SERVER_ERROR = 500,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    BAD_REQUEST = 400,
    NOT_FOUND = 404
}