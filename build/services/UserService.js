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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const HttpError_1 = require("../errors/HttpError");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
    constructor(userRepositorie, jwtService) {
        this.userRepositorie = userRepositorie;
        this.jwtService = jwtService;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userRepositorie.findMany();
            return users;
        });
    }
    createUser(attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            const userAlreadyExists = yield this.userRepositorie.findUnique(attributes.email);
            if (userAlreadyExists)
                throw new HttpError_1.HttpError(404, "Usuário já existente com esse mesmo email!");
            const passwordHash = yield bcrypt_1.default.hash(attributes.password, 10);
            attributes.password = passwordHash;
            const newUser = yield this.userRepositorie.create(attributes);
            return newUser;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepositorie.findUnique(email);
            if (!user)
                throw new HttpError_1.HttpError(404, "Usuário não encontrado!");
            return user;
        });
    }
    checkPassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findByEmail(email);
            const correctPasword = yield bcrypt_1.default.compare(password, user.password);
            if (!correctPasword)
                throw new HttpError_1.HttpError(404, "A senha está incorreta!");
            const token = this.jwtService.signToken(user.id, user.email);
            return token;
        });
    }
    userExists(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepositorie.findById(id);
            if (!user)
                throw new HttpError_1.HttpError(404, "Usuário não encontrado!");
        });
    }
    updateById(id, attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userExists(id);
            const updateUser = yield this.userRepositorie.update(id, attributes);
            return updateUser;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userExists(id);
            const deletedUser = yield this.userRepositorie.delete(id);
            return deletedUser;
        });
    }
}
exports.UserService = UserService;
