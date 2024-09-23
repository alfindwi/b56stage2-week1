import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    passwordUsers: z.string()
});

export type LoginFormInput = z.infer<typeof loginSchema>;