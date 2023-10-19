import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/users';

const userService = new UserService();

export class UserController {
    constructor() {
        this.test = this.test.bind(this)
    }

    async test(request: Request, response: Response, next: NextFunction) {
            const users = await userService.signIn()
            return response.send(users)
    }
}
