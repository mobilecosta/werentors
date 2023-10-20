import { prisma } from '../lib/prisma';

export class UserService {
    constructor() {
        this.signIn = this.signIn.bind(this)
        this.signUp = this.signUp.bind(this)
    }

    async signUp() {
    }

    async signIn() {
            const [users] = await prisma.user.findMany()
            return users
    }
}
