import { z } from "zod";

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/

export const userSchema = z.object({
    id: z.string().uuid().optional(),
    email: z.string().email(),
    name: z.string(),
    username: z.string(),
    password: z.string().regex(passwordRegex),
    createdAt: z.date().optional(),
})

export const createUserSchema = z.object({
    email: z.string().email(),
    name: z.string(),
    username: z.string(),
    password: z.string().regex(passwordRegex),
})

export const signInUserSchema = z.object({
    username: z.string(),
    password: z.string().regex(passwordRegex)
})
