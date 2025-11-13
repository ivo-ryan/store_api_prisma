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
exports.ProductController = void 0;
const ProductRequestSchema_1 = require("./schema/ProductRequestSchema");
class ProductController {
    constructor(productService) {
        this.productService = productService;
        this.index = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, order = "asc", page = "1", pageSize = "10", sortBy = "name" } = ProductRequestSchema_1.GetProductRequestSchema.parse(req.query);
                const products = yield this.productService.findAllProducts({
                    name,
                    order,
                    page: +page,
                    pageSize: +pageSize,
                    sortBy
                });
                res.json(products);
            }
            catch (error) {
                next(error);
            }
        });
        this.show = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = +req.params.id;
                const product = yield this.productService.findByIdProduct(id);
                res.json(product);
            }
            catch (error) {
                next(error);
            }
        });
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = ProductRequestSchema_1.ProductRequestSchema.parse(req.body);
                const newProduct = yield this.productService.createProduct(body);
                res.status(201).json(newProduct);
            }
            catch (error) {
                next(error);
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = +req.params.id;
                const body = ProductRequestSchema_1.UpdateProductRequestSchema.parse(req.body);
                const updatedProduct = yield this.productService.updateProduct(id, body);
                res.json(updatedProduct);
            }
            catch (error) {
                next(error);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = +req.params.id;
                const deletedProduct = yield this.productService.deleteProduct(id);
                res.json(deletedProduct);
            }
            catch (error) {
                next(error);
            }
        });
        this.featuredProduct = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const featuredProducts = yield this.productService.featuredProducts();
                res.json(featuredProducts);
            }
            catch (error) {
                next(error);
            }
        });
        this.addFavorite = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const productId = req.body;
                const addFavorite = yield this.productService.addFavorite(userId, productId.productId);
                res.status(201).json(addFavorite);
            }
            catch (error) {
                next(error);
            }
        });
        this.getFavoriteProduct = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const productId = +req.params.productId;
                const getFavoriteProduct = yield this.productService.findUniqueFavorites(userId, productId);
                res.json(getFavoriteProduct);
            }
            catch (error) {
                next(error);
            }
        });
        this.getAllFavorites = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const favorites = yield this.productService.favorites(userId);
                res.json(favorites);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteFavorite = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const productId = +req.params.productId;
                const deleteFavorite = yield this.productService.deleteFavorite(userId, productId);
                res.json(deleteFavorite);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ProductController = ProductController;
