import z from "zod";

export const UserRequestSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string()
});

export const UserByEmailRequestSchema = z.object({
    email: z.email()
});

export const UpdateUserRequestSchema = z.object({
    name: z.string().optional(),
    email: z.email().optional(),
    password: z.string().optional()
});

