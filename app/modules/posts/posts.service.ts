import { PrismaClient } from "@prisma/client";
import type { createPostSchema } from "./posts.schema";
import type { z } from "zod";

const prisma = new PrismaClient();

export async function getPosts() {
  return await prisma.post.findMany({
    orderBy : {
        id : "asc"
    }
  });
}

export async function createPost(data: z.infer<typeof createPostSchema>) {

  return await prisma.post.create({data});
}

export async function deletePost(idPost: any) {
  return prisma.post.delete({where : {id : parseInt(idPost)}})
}


export async function updatePost(id: any, data: any) {
    const updatedPost = await prisma.post.update({
      where: { id: parseInt(id) },
      data: data,
    });
    return updatedPost;
  }

  export async function getPostById(id: any) {
    return await prisma.post.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  }

export async function isDone(id: any, data: any) {
    const updatedPost = await prisma.post.update({
      where: { id: parseInt(id) },
      data: data,
    });
    return updatedPost;
  }