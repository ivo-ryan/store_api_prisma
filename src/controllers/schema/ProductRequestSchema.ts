import z from "zod";

export const ProductRequestSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    mark: z.string(),
    categoryId: z.number()
});

export const UpdateProductRequestSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    mark: z.string().optional(),
    categoryId: z.number().optional()
})