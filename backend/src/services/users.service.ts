import { prisma } from '../lib/prisma';
import { createUserSchema } from '../schema/users.schema';
import { z } from 'zod';
import bcrypt from 'bcrypt';

export class UserService {
    constructor(private saltRounds: number) {
        this.saltRounds = saltRounds;
        this.signIn = this.signIn.bind(this)
        this.signUp = this.signUp.bind(this)
    }

    async signUp(user: z.infer<typeof createUserSchema>) {
        const salt = bcrypt.genSaltSync(this.saltRounds)
        const hash = bcrypt.hashSync(user.password, salt)
        const createUser = await prisma.user.create({ data: {
            ...user,
            password: hash
        } })
        console.log(createUser)
        return createUser
    }

    async signIn() {
            const [users] = await prisma.user.findMany()
            return users
    }
}
