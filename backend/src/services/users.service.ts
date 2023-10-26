import { prisma } from '../lib/prisma';
import { createUserSchema, signInUserSchema } from '../schema/users.schema';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserService {
    constructor(private saltRounds: number, private secretKey: string) {
        this.saltRounds = saltRounds
        this.secretKey = secretKey
        this.signIn = this.signIn.bind(this)
        this.signUp = this.signUp.bind(this)
    }

    async signUp(user: z.infer<typeof createUserSchema>) {
        const salt = bcrypt.genSaltSync(this.saltRounds)
        const hash = bcrypt.hashSync(user.password, salt)
        try {
            const createUser = await prisma.user.create({ data: {
                ...user,
                password: hash
            } })
            return createUser
        } catch (error) {
            console.log(error)
        }
    }

    async signIn({ username, password } : z.infer<typeof signInUserSchema>) {
        try {
            const user = await prisma.user.findFirstOrThrow({
                where: {
                    username,
                }
            })
            
            const validPassword = bcrypt.compareSync(password, user.password);

            if (!validPassword)
                throw new Error('Wrong Password!')
            // Fazer o sistema do jwt no service e colocar o sistema de cookies no controler
            const payload = { id: user.id, email: user.email, name: user.name, username: user.username };
            // Need to implement jwt options
            
            const token = jwt.sign(payload, this.secretKey, { expiresIn: '24h' })
            return token
        } catch(error) {
            console.log(error)
        }
    }
}
