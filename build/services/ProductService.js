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
exports.ProductService = void 0;
const HttpError_1 = require("../errors/HttpError");
class ProductService {
    constructor(productRepositorie) {
        this.productRepositorie = productRepositorie;
    }
    findAllProducts(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, order, page = 1, pageSize = 10, sortBy }) {
            const limit = pageSize;
            const offset = (page - 1) * limit;
            const where = {};
            if (name)
                where.name = { like: name, mode: "insensitive" };
            const products = yield this.productRepositorie.findMany({ where, limit, offset, order, sortBy });
            const total = yield this.productRepositorie.count(where);
            return {
                data: products,
                meta: {
                    page,
                    pageSize: limit,
                    total,
                    totalPages: Math.ceil(total / limit)
                }
            };
        });
    }
    productExists(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepositorie.findUnique(id);
            if (!product)
                throw new HttpError_1.HttpError(404, "Produto não encontrado!");
        });
    }
    findByIdProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productExists(id);
            const product = yield this.productRepositorie.findUnique(id);
            return product;
        });
    }
    createProduct(_a) {
        return __awaiter(this, arguments, void 0, function* ({ categoryId, description, mark, name, oldPrice, price, rating, featured = false, isNew = false }) {
            const newProduct = yield this.productRepositorie.create({
                categoryId,
                description,
                mark,
                name,
                oldPrice,
                price,
                rating,
                featured,
                isNew
            });
            return newProduct;
        });
    }
    updateProduct(id, attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productExists(id);
            const updatedProduct = yield this.productRepositorie.update(id, attributes);
            return updatedProduct;
        });
    }
    featuredProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const featured = yield this.productRepositorie.featuredProduct();
            if (!featured)
                throw new HttpError_1.HttpError(404, "Nenhum produto em destaque foi encontrado!");
            return featured;
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productExists(id);
            const removeProduct = yield this.productRepositorie.delete(id);
            return removeProduct;
        });
    }
    imageExists(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const image = yield this.productRepositorie.imageExists(id);
            if (!image)
                throw new HttpError_1.HttpError(404, "Imagem não encontrada!");
        });
    }
    addImage(attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            const createImage = yield this.productRepositorie.addImage(attributes);
            return createImage;
        });
    }
    updateImage(id, attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.imageExists(id);
            const updatedImage = yield this.productRepositorie.updateImage(id, attributes);
            return updatedImage;
        });
    }
    deleteImage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.imageExists(id);
            const deletedImage = yield this.productRepositorie.removeImage(id);
            return deletedImage;
        });
    }
    addFavorite(userId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productExists(productId);
            const addfavorite = yield this.productRepositorie.addFavoriteProduct(userId, productId);
            return addfavorite;
        });
    }
    findUniqueFavorites(userId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productExists(productId);
            const productFavorite = yield this.productRepositorie.getProductFavoriteById(userId, productId);
            return productFavorite;
        });
    }
    deleteFavorite(userId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productExists(productId);
            const removeFavorite = yield this.productRepositorie.removeFavoriteProduct(userId, productId);
            return removeFavorite;
        });
    }
    favorites(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const favorites = yield this.productRepositorie.getAllFavorites(userId);
            return favorites;
        });
    }
}
exports.ProductService = ProductService;
