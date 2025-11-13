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
exports.UsersController = void 0;
const UserRequestSchema_1 = require("./schema/UserRequestSchema");
class UsersController {
    constructor(userService) {
        this.userService = userService;
        this.index = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userService.findAll();
                res.json(users);
            }
            catch (error) {
                next(error);
            }
        });
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = UserRequestSchema_1.UserRequestSchema.parse(req.body);
                const newUser = yield this.userService.createUser(body);
                res.status(201).json(newUser);
            }
            catch (error) {
                next(error);
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = UserRequestSchema_1.UserLoginRequestSchema.parse(req.body);
                const token = yield this.userService.checkPassword(body.email, body.password);
                res.json({ authenticated: true, token: token });
            }
            catch (error) {
                next(error);
            }
        });
        this.show = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const email = UserRequestSchema_1.UserByEmailRequestSchema.parse(req.body);
                const user = yield this.userService.findByEmail(email.email);
                res.json(user);
            }
            catch (error) {
                next(error);
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const body = UserRequestSchema_1.UpdateUserRequestSchema.parse(req.body);
                const updatedUser = yield this.userService.updateById(id, body);
                res.json(updatedUser);
            }
            catch (error) {
                next(error);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const deletedUser = yield this.userService.deleteById(id);
                res.json(deletedUser);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UsersController = UsersController;
