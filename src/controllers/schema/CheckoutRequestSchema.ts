import z from "zod";

export const CheckoutRequestSchema = z.object({
    items: z.array(z.object({
        productId: z.number(),
        name: z.string(),
        price: z.number(),
        quantity: z.number()
    })),
    customer: z.string().optional()
})