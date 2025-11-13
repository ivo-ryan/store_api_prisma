"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const HttpError_1 = require("../errors/HttpError");
const zod_1 = require("zod");
const library_1 = require("@prisma/client/runtime/library");
const errorHandlerMiddleware = (error, req, res, next) => {
    if (error instanceof HttpError_1.HttpError) {
        res.status(error.status).json({ message: error.message });
    }
    else if (error instanceof Error) {
        res.status(500).json({ message: error.message });
    }
    else if (error instanceof zod_1.ZodError) {
        res.status(500).json({ message: " Erro de validação " });
    }
    else if (error instanceof library_1.PrismaClientKnownRequestError) {
        res.status(500).json({ message: " Erro de parâmetro duplicado! " });
    }
    else {
        res.status(500).json({ message: "Erro interno so servidor!" });
    }
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
