import { z } from "zod";

export const createThreadSchema = z.object({
  content: z.string().min(1),
  image: z.instanceof(FileList).refine((file) => file.length > 0, { message: "Please select an image" }),
});


export type CreateThreadFormInputs = z.infer<typeof createThreadSchema>;

