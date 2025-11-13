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
exports.CartProductController = void 0;
const CartProductRequestSchema_1 = require("./schema/CartProductRequestSchema");
class CartProductController {
    constructor(cartProductService) {
        this.cartProductService = cartProductService;
        this.getAllProducts = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const productsInCart = yield this.cartProductService.getAllProducts(userId);
                res.json(productsInCart);
            }
            catch (error) {
                next(error);
            }
        });
        this.addProduct = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const { productId, change } = CartProductRequestSchema_1.CartProductRequestSchema.parse(req.body);
                const newProductInCart = yield this.cartProductService.addProductCart(userId, productId, change);
                res.status(201).json(newProductInCart);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteProduct = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const productId = +req.params.id;
                const deleteProductIncart = yield this.cartProductService.removeProductInCart(userId, productId);
                res.json(deleteProductIncart);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.CartProductController = CartProductController;
