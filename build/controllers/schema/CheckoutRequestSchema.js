"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatedPaymentRequestSchema = exports.CheckoutRequestSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.CheckoutRequestSchema = zod_1.default.object({
    items: zod_1.default.array(zod_1.default.object({
        productId: zod_1.default.number(),
        name: zod_1.default.string(),
        price: zod_1.default.number(),
        quantity: zod_1.default.number()
    }))
});
exports.UpdatedPaymentRequestSchema = zod_1.default.object({
    status: zod_1.default.enum(["PAID", "FAILED"])
});
