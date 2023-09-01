import { PrismaClient } from "@prisma/client";
import type { z } from "zod";
import * as bcrypt from "bcryptjs";
import type { loginUserSchema } from "./auth.schema";

const prisma = new PrismaClient();

export async function login(data: z.infer<typeof loginUserSchema>) {
    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });
    if (!user) return null;
    const isCorrectPassword = await bcrypt.compare(data.password, user.password);
    if (!isCorrectPassword) return null;
    return user;
  }