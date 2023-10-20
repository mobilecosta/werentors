import { z } from "zod";

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/

export const userSchema = z.object({
    id: z.string().uuid().optional(),
    createdAt: z.date().optional(),
    email: z.string().email(),
    name: z.string(),
    username: z.string().optional(),
    password: z.string().regex(passwordRegex),
})