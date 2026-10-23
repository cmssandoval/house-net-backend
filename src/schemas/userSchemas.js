import z from "zod";

export const registerSchema = z.object({
    body: z.object({
        email: z.string(),
        fullName: z.string(),
        password: z.string(),
    }).strict(),
});

export const loginSchema = z.object({
    body: z.object({
        email: z.string(),
        password: z.string(),
    }).strict(),
});