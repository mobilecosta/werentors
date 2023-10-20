import { Request, Response, NextFunction } from "express"

export const errorHandling = (error: Error, request: Request, response: Response, next: NextFunction) => {
    response.status(400).json({
        msg: error.message,
        success: false,
    })
}
