import z from "zod";

export const CartProductRequestSchema = z.object({
    userId: z.number(),
    productId: z.number(),
    change: z.number().optional()
});

export const deleteProductIncartRequestSchema = z.object({
    userId: z.number(),
    productId: z.number()
});