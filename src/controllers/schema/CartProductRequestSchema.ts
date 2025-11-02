import z from "zod";

export const CartProductRequestSchema = z.object({
    productId: z.number(),
    change: z.number().optional()
});