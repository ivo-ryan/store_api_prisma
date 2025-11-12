import z from "zod";

export const CheckoutRequestSchema = z.object({
    items: z.array(z.object({
        productId: z.number(),
        name: z.string(),
        price: z.number(),
        quantity: z.number()
    }))
});

export const UpdatedPaymentRequestSchema = z.object({
    status: z.enum(["PAID", "FAILED"])
})