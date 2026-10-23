import z from "zod";

export const createProductSchema = z.object({
  body: z.object({
    productName: z.string(),
    category: z.string(),
    location: z.string(),
    stock: z.number().int().positive(),
    unit: z.string(),
  }),
});

// export const createCategorySchema = z.object({
//   body: z.object({
    
//   }),
// });

// export const createLocationSchema = z.object({
//   body: z.object({

//   }),
// });