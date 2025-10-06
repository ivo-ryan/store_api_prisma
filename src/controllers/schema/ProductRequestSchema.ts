import z from "zod";


export const GetProductRequestSchema = z.object({
    name: z.string().optional(),
    page: z.string().optional(),
    pageSize: z.string().optional(),
    sortBy: z.enum(["name", "createdAt"]).optional(),
    order: z.enum(["asc", "desc"]).optional()
});

export const ProductRequestSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    mark: z.string(),
    categoryId: z.number(),
    oldPrice: z.number(),
    featured: z.boolean().optional(),
    isNew:  z.boolean().optional(),
    rating: z.number()
});

export const UpdateProductRequestSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    mark: z.string().optional(),
    categoryId: z.number().optional(),
    oldPrice: z.number().optional(),
    featured: z.boolean().optional(),
    isNew:  z.boolean().optional(),
    rating: z.number().optional()
});

export const ImageProductRequestSchema = z.object({
    url: z.string(),
    altText: z.string().optional(),
    productId: z.number()
});

export const UpdatedImageProductRequestSchema = z.object({
    url: z.string().optional(),
    altText: z.string().optional(),
    productId: z.number().optional()
});
