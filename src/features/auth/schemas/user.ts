import { z } from "zod";

export const userSchema = z.object({
  image: z.string().optional(),
  username: z.string().min(1),
  bio: z.string().min(1),
  fullName: z.string().min(1),
});


export type updateUser = z.infer<typeof userSchema>;

