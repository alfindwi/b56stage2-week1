import { z } from "zod";

export const createThreadSchema = z.object({
  content: z.string().min(1),
  image: z.string().optional(),
});


export type CreateThreadFormInputs = z.infer<typeof createThreadSchema>;