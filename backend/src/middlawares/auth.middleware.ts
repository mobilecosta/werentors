import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { secretKey } from "../lib/server-data";

export const authMiddleware = (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.header('Authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return response.status(401).json({ message: 'Token não fornecido ou inválido' });
        }

        const token = authHeader.split(' ')[1];

        jwt.verify(token, secretKey, (error, decoded) => {
            if (error) {
                return response.status(401).json({ message: 'Token inválido' });
            }

            (request as any).userId = (decoded as any).userId;
            next();
        });
}
