"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginRequestSchema = exports.UpdateUserRequestSchema = exports.UserByEmailRequestSchema = exports.UserRequestSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.UserRequestSchema = zod_1.default.object({
    name: zod_1.default.string(),
    email: zod_1.default.email(),
    password: zod_1.default.string()
});
exports.UserByEmailRequestSchema = zod_1.default.object({
    email: zod_1.default.email()
});
exports.UpdateUserRequestSchema = zod_1.default.object({
    name: zod_1.default.string().optional(),
    email: zod_1.default.email().optional(),
    password: zod_1.default.string().optional()
});
exports.UserLoginRequestSchema = zod_1.default.object({
    email: zod_1.default.email(),
    password: zod_1.default.string()
});
