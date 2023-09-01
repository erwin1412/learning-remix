import { z } from "zod";

export const createProductSchema = z.object(
{
    name : z.string().min(1),
    description : z.string().min(1),
    price       : z.number().min(1),
}
);