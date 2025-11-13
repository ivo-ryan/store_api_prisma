"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductPrismaRepositorie = void 0;
const database_1 = require("../../database/database");
class ProductPrismaRepositorie {
    findMany(params) {
        var _a, _b, _c, _d, _e, _f, _g;
        return database_1.prisma.product.findMany({
            where: {
                name: {
                    contains: (_b = (_a = params.where) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.like,
                    equals: (_d = (_c = params.where) === null || _c === void 0 ? void 0 : _c.name) === null || _d === void 0 ? void 0 : _d.equals,
                    mode: (_f = (_e = params.where) === null || _e === void 0 ? void 0 : _e.name) === null || _f === void 0 ? void 0 : _f.mode
                }
            },
            skip: params.offset,
            take: params.limit,
            include: { images: true },
            orderBy: { [(_g = params.sortBy) !== null && _g !== void 0 ? _g : "name"]: params.order }
        });
    }
    count(params) {
        var _a, _b, _c;
        return database_1.prisma.product.count({
            where: {
                name: {
                    contains: (_a = params.name) === null || _a === void 0 ? void 0 : _a.like,
                    equals: (_b = params.name) === null || _b === void 0 ? void 0 : _b.equals,
                    mode: (_c = params.name) === null || _c === void 0 ? void 0 : _c.mode
                }
            }
        });
    }
    findUnique(id) {
        return database_1.prisma.product.findUnique({
            where: { id },
            include: {
                images: true
            }
        });
    }
    create(attributes) {
        return database_1.prisma.product.create({ data: attributes });
    }
    update(id, attributes) {
        return database_1.prisma.product.update({
            where: { id },
            data: attributes
        });
    }
    delete(id) {
        return database_1.prisma.product.delete({ where: { id } });
    }
    featuredProduct() {
        return database_1.prisma.product.findMany({
            where: { featured: true },
            include: { images: true }
        });
    }
    addImage(attributes) {
        return database_1.prisma.productImage.create({
            data: attributes
        });
    }
    updateImage(id, attributes) {
        return database_1.prisma.productImage.update({
            where: { id },
            data: attributes
        });
    }
    removeImage(id) {
        return database_1.prisma.productImage.delete({ where: { id } });
    }
    imageExists(id) {
        return database_1.prisma.productImage.findUnique({ where: { id } });
    }
    addFavoriteProduct(userId, productId) {
        return database_1.prisma.favorite.create({
            data: {
                productId,
                userId
            }
        });
    }
    getProductFavoriteById(userId, productId) {
        return database_1.prisma.favorite.findUnique({
            where: { userId_productId: { productId, userId } }
        });
    }
    removeFavoriteProduct(userId, productId) {
        return database_1.prisma.favorite.delete({
            where: {
                userId_productId: { productId, userId }
            }
        });
    }
    getAllFavorites(userId) {
        return database_1.prisma.favorite.findMany({
            where: { userId },
            include: { product: {
                    include: { images: true }
                } }
        });
    }
}
exports.ProductPrismaRepositorie = ProductPrismaRepositorie;
