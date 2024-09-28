import { z } from "zod";

export const createReplySchema = z.object({
    content: z.string().min(1),
    image: z.instanceof(FileList || null),
})

export type CreateReplyFormInputs = z.infer<typeof createReplySchema>;
