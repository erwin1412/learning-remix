import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1),
  isDone: z.boolean().default(false),
  userId : z.number(),
});
