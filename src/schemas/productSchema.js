import z from "zod";

const createProductSchema = z.object({
  body: z.object({
    productName: z.string(),
    category: z.string(),
    location: z.string(),
    stock: z.number().int().positive(),
    unit: z.string(),
  }),
});

export default createProductSchema;