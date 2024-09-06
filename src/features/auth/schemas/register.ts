import { z } from "zod";

export const registerSchema = z.object({
    fullName: z.string().min(1, "Full Name is required" ),
    email: z.string().email("Invalid email" ),
    password: z.string().min(4, "Password must be at least 4 characters" ).max(255, "Password is too long"),
});

export type RegisterFormInput = z.infer<typeof registerSchema>;