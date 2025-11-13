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
exports.CartProductPrismaRepositorie = void 0;
const database_1 = require("../../database/database");
class CartProductPrismaRepositorie {
    cartIdExists(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const user = yield database_1.prisma.user.findUniqueOrThrow({
                where: { id: userId },
                include: { cart: { select: { id: true } } }
            });
            return (_b = (_a = user.cart) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : (yield database_1.prisma.cart.create({ data: { userId } })).id;
        });
    }
    addProductInCart(userId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartId = yield this.cartIdExists(userId);
            return database_1.prisma.cartProduct.create({
                data: {
                    cartId,
                    productId
                }
            });
        });
    }
    removeProductInCart(userId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartId = yield this.cartIdExists(userId);
            return database_1.prisma.cartProduct.delete({ where: { cartId_productId: { cartId, productId } } });
        });
    }
    getProductsInCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartId = yield this.cartIdExists(userId);
            return database_1.prisma.cartProduct.findMany({
                where: { cartId },
                include: {
                    product: {
                        include: { images: true }
                    }
                }
            });
        });
    }
    productExists(productId) {
        return database_1.prisma.product.findUnique({ where: { id: productId } });
    }
    cartIdAlreadyExists(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartId = yield database_1.prisma.user.findUnique({ where: { id: userId }, include: { cart: true } });
            return cartId;
        });
    }
    productAlreadyInCart(userId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartId = yield this.cartIdAlreadyExists(userId);
            if (!(cartId === null || cartId === void 0 ? void 0 : cartId.cart)) {
                return null;
            }
            else {
                return database_1.prisma.cartProduct.findUnique({ where: { cartId_productId: { cartId: cartId.cart.id, productId } } });
            }
        });
    }
    updateQuantityInCart(userId, productId, change) {
        return __awaiter(this, void 0, void 0, function* () {
            const productCart = yield this.productAlreadyInCart(userId, productId);
            const cartId = yield this.cartIdAlreadyExists(userId);
            if (!(cartId === null || cartId === void 0 ? void 0 : cartId.cart) || !(productCart === null || productCart === void 0 ? void 0 : productCart.quantity)) {
                return null;
            }
            const newQuatity = productCart.quantity + change;
            if (newQuatity <= 0) {
                yield database_1.prisma.cartProduct.delete({
                    where: { cartId_productId: {
                            cartId: cartId.cart.id,
                            productId
                        } }
                });
                return null;
            }
            return database_1.prisma.cartProduct.update({
                where: { cartId_productId: {
                        cartId: cartId.cart.id,
                        productId
                    } },
                data: { quantity: newQuatity }
            });
        });
    }
}
exports.CartProductPrismaRepositorie = CartProductPrismaRepositorie;
