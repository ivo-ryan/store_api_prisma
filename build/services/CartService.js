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
exports.CartProductService = void 0;
const HttpError_1 = require("../errors/HttpError");
class CartProductService {
    constructor(cartProductRespositorie) {
        this.cartProductRespositorie = cartProductRespositorie;
    }
    productExists(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const productExists = yield this.cartProductRespositorie.productExists(productId);
            if (!productExists)
                throw new HttpError_1.HttpError(404, "Product não encontrado!");
        });
    }
    addProductCart(userId_1, productId_1) {
        return __awaiter(this, arguments, void 0, function* (userId, productId, change = 0) {
            yield this.productExists(productId);
            const productAlreadyExists = yield this.cartProductRespositorie.updateQuantityInCart(userId, productId, change);
            if (productAlreadyExists)
                return productAlreadyExists;
            const addProductCart = yield this.cartProductRespositorie.addProductInCart(userId, productId);
            return addProductCart;
        });
    }
    removeProductInCart(userId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productExists(productId);
            const deleteProductIncart = yield this.cartProductRespositorie.removeProductInCart(userId, productId);
            return deleteProductIncart;
        });
    }
    getAllProducts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const productsCart = yield this.cartProductRespositorie.getProductsInCart(userId);
            return productsCart;
        });
    }
}
exports.CartProductService = CartProductService;
