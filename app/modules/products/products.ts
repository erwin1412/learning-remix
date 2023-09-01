import { PrismaClient } from "@prisma/client";
import type { createProductSchema } from "./products.schema";
import type { z } from "zod";

const prisma = new PrismaClient();

export async function getProducts() {
  return await prisma.product.findMany({
    orderBy : {
        id : "asc"
    }
  });
}

export async function createProduct(data: z.infer<typeof createProductSchema>) {
  const title = await prisma.product.create({data});
  return title;
}

export async function deleteProduct(idProduct: any) {
  return prisma.product.delete({where : {id : parseInt(idProduct)}})
}


export async function updateProduct(id: any, data: any) {
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: data,
    });
    return updatedProduct;
  }