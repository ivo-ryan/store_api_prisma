"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthViaQuery = exports.ensureAuth = void 0;
const HttpError_1 = require("../errors/HttpError");
const container_1 = require("../container");
const ensureAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        throw new HttpError_1.HttpError(404, "Não autorizado, nenhum token foi encontrado!");
    const token = authHeader.replace(/Bearer /, '');
    container_1.jwt.verifyToken(token, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err || typeof decoded === "undefined")
            throw new HttpError_1.HttpError(404, "Não autorizado: token inválido!");
        const user = yield container_1.userService.findByEmail(decoded.email);
        req.user = user;
        next();
    }));
};
exports.ensureAuth = ensureAuth;
const ensureAuthViaQuery = (req, res, next) => {
    const { token } = req.query;
    if (!token)
        throw new HttpError_1.HttpError(404, 'Token não encontrado!');
    if (typeof token !== 'string')
        throw new HttpError_1.HttpError(400, 'O parâmetro token deve ser do tipo string!');
    container_1.jwt.verifyToken(token, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err || typeof decoded === 'undefined')
            throw new HttpError_1.HttpError(401, 'Não autorizado: token inválido!');
        const user = yield container_1.userService.findByEmail(decoded.email);
        req.user = user;
        next();
    }));
};
exports.ensureAuthViaQuery = ensureAuthViaQuery;
