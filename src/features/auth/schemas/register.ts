import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Please Enter a Valid Email Address"),
  passwordUsers: z.string().min(6, "Password must be at least 6 characters"),
});

export type RegisterFormInput = z.infer<typeof registerSchema>;
