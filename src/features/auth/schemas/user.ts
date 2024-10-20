import { z } from "zod";

export const userSchema = z.object({
  image: z.instanceof(FileList || null).optional(),
  username: z.string().optional(),
  bio: z.string().optional(),
  fullName: z.string().optional(),
  backgroundImage: z.instanceof(FileList || null).optional(),
});

export type updateUser = z.infer<typeof userSchema>;
