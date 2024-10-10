// schemas/thread.ts
import { z } from "zod";

export const createThreadSchema = z.object({
  content: z.string().min(1, "Content is required"), 
  image: z.instanceof(FileList || null).optional(),
});


export type CreateThreadFormInputs = z.infer<typeof createThreadSchema>;
