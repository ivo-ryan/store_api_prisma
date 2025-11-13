"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatedImageProductRequestSchema = exports.ImageProductRequestSchema = exports.UpdateProductRequestSchema = exports.ProductRequestSchema = exports.GetProductRequestSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.GetProductRequestSchema = zod_1.default.object({
    name: zod_1.default.string().optional(),
    page: zod_1.default.string().optional(),
    pageSize: zod_1.default.string().optional(),
    sortBy: zod_1.default.enum(["name", "createdAt"]).optional(),
    order: zod_1.default.enum(["asc", "desc"]).optional()
});
exports.ProductRequestSchema = zod_1.default.object({
    name: zod_1.default.string(),
    description: zod_1.default.string(),
    price: zod_1.default.number(),
    mark: zod_1.default.string(),
    categoryId: zod_1.default.number(),
    oldPrice: zod_1.default.number(),
    featured: zod_1.default.boolean().optional(),
    isNew: zod_1.default.boolean().optional(),
    rating: zod_1.default.number()
});
exports.UpdateProductRequestSchema = zod_1.default.object({
    name: zod_1.default.string().optional(),
    description: zod_1.default.string().optional(),
    price: zod_1.default.number().optional(),
    mark: zod_1.default.string().optional(),
    categoryId: zod_1.default.number().optional(),
    oldPrice: zod_1.default.number().optional(),
    featured: zod_1.default.boolean().optional(),
    isNew: zod_1.default.boolean().optional(),
    rating: zod_1.default.number().optional()
});
exports.ImageProductRequestSchema = zod_1.default.object({
    url: zod_1.default.string(),
    altText: zod_1.default.string().optional(),
    productId: zod_1.default.number()
});
exports.UpdatedImageProductRequestSchema = zod_1.default.object({
    url: zod_1.default.string().optional(),
    altText: zod_1.default.string().optional(),
    productId: zod_1.default.number().optional()
});
