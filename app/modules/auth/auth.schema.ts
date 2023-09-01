import { z } from "zod";

export const createUserSchema = z.object({
  fullname: z.string().min(1),
  username: z.string().min(1),
  email: z.string().min(1).email(),
  password: z.string().min(1),
  roles: z.string().min(1).default("user"),
  profile: z.string().min(1).default("testing.png"),
});
export const loginUserSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1),
 });