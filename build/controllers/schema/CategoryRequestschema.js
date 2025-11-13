"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategoryRequestSchema = exports.CategoryRequestSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.CategoryRequestSchema = zod_1.default.object({
    name: zod_1.default.string(),
    position: zod_1.default.number()
});
exports.UpdateCategoryRequestSchema = zod_1.default.object({
    name: zod_1.default.string().optional(),
    position: zod_1.default.number().optional()
});
