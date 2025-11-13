"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPrismaRepositorie = void 0;
const database_1 = require("../../database/database");
class UserPrismaRepositorie {
    findMany() {
        return database_1.prisma.user.findMany();
    }
    ;
    create(attributes) {
        return database_1.prisma.user.create({ data: attributes });
    }
    ;
    findUnique(email) {
        return database_1.prisma.user.findUnique({
            where: { email },
            include: { cart: { include: { products: { include: { product: true } } } } }
        });
    }
    ;
    findById(id) {
        return database_1.prisma.user.findUnique({ where: { id } });
    }
    ;
    update(id, attributes) {
        return database_1.prisma.user.update({
            where: { id },
            data: attributes
        });
    }
    ;
    delete(id) {
        return database_1.prisma.user.delete({ where: { id } });
    }
    ;
}
exports.UserPrismaRepositorie = UserPrismaRepositorie;
