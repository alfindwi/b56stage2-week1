import { z } from "zod";

export const registerSchema = z.object({
    fullName: z.string(),
    email: z.string().email(),
    passwordUsers: z.string()
})

export type RegisterFormInput = z.infer<typeof registerSchema>;