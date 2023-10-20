import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/users.service';
import { userSchema } from '../schema/users.schema';

const userService = new UserService();

export class UserController {
    constructor() {
        this.signIn = this.signIn.bind(this)
        this.signUp = this.signUp.bind(this)
    }

    async signUp(request: Request, response: Response, next: NextFunction) {
        try {
            const user = request.body;
            userSchema.parse(user)
        } catch (error) {
            next(error);
        }
    }

    async signIn(request: Request, response: Response, next: NextFunction) {
            const users = await userService.signIn()
            return response.send(users)
    }
}
