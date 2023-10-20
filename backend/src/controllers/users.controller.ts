import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/users.service';
import { userSchema } from '../schema/users.schema';
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { saltRounds } from '../lib/server-data';

const userService = new UserService(saltRounds);

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
            const users = await userService.signIn()
            return response.send(users)
    }
}
