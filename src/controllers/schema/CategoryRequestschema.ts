import z from "zod";

export const CategoryRequestSchema = z.object({
    name: z.string(),
    position: z.number(),
    image: z.string()
})

export const UpdateCategoryRequestSchema = z.object({
    name: z.string().optional(),
    position: z.number().optional(),
    image: z.string()
})