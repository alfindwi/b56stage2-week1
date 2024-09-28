import { z } from "zod";

export const createThreadSchema = z.object({
  content: z.string().min(1),
  image: z.instanceof(FileList || null),
});



export type CreateThreadFormInputs = z.infer<typeof createThreadSchema>;


