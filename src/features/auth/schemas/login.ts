import { z } from "zod";

export const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, { message: "Email atau Username tidak boleh kosong" })
    .refine(value => {
      return /^\S+@\S+\.\S+$/.test(value) || /^[a-zA-Z0-9_]{3,}$/.test(value);
    }, { message: "Masukkan Email atau Username yang valid" }),
  passwordUsers: z.string().min(6, { message: "Password harus memiliki minimal 6 karakter" }),
});


export type LoginFormInput = z.infer<typeof loginSchema>;
