import { Request, Response, NextFunction } from "express";


export const errorHandling = (error: Error, _request: Request, response: Response, _next: NextFunction) => {
    return response.status(400).json({
        msg: error.message,
        success: false,
    })
}
