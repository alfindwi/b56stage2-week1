import { z } from "zod";

export const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, { message: "Please Enter a Valid Email Adrress or Username" })
    .refine(value => {
      return /^\S+@\S+\.\S+$/.test(value) || /^[a-zA-Z0-9_]{3,}$/.test(value);
    }, { message: "Please Enter a Valid Email Adrress or Username" }),
  passwordUsers: z.string().min(6, { message: "Password must be at least 6 characters" }),
});


export type LoginFormInput = z.infer<typeof loginSchema>;
