import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/users.service';
import { userSchema } from '../schema/users.schema';
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { saltRounds, secretKey } from '../lib/server-data';

const userService = new UserService(saltRounds, secretKey);

export class UserController {
    constructor() {
        this.signIn = this.signIn.bind(this)
        this.signUp = this.signUp.bind(this)
    }
    
    async signUp(request: Request, response: Response, next: NextFunction) {
        try {
            const user = request.body;
            userSchema.parse(user)
            const createUser = userService.signUp(user)
            return response.send(createUser)
        } catch (error) {
            // z.setErrorMap(errorMap)
            const validationError = fromZodError(error as ZodError);
            next(validationError);
        }
    }

    async signIn(request: Request, response: Response, next: NextFunction) {
        const { username, password } = request.body;
        try {
            const token = await userService.signIn({ username, password })
            response.header('Authorization', `Bearer ${token}`);
            return response.send({ message: 'Autenticação bem sucedida!', token })
        } catch (error) {
            console.log('controller: ' + error)
            next(error);
        }
    }
}
