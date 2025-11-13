"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtService {
    constructor(secret) {
        this.secret = secret;
    }
    signToken(userId, email) {
        const token = jsonwebtoken_1.default.sign({ id: userId, email }, this.secret, { expiresIn: "1d" });
        return token;
    }
    verifyToken(token, callback) {
        jsonwebtoken_1.default.verify(token, this.secret, callback);
    }
}
exports.JwtService = JwtService;
