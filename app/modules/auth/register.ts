import { PrismaClient } from "@prisma/client";
import type { z } from "zod";
import type { createUserSchema } from "./auth.schema";

const prisma = new PrismaClient();

export async function register(data: z.infer<typeof createUserSchema>) {
    return await prisma.user.create({ data });
  }



