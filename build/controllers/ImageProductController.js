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
exports.ImageProductController = void 0;
const ProductRequestSchema_1 = require("./schema/ProductRequestSchema");
class ImageProductController {
    constructor(productService) {
        this.productService = productService;
        this.addImage = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = ProductRequestSchema_1.ImageProductRequestSchema.parse(req.body);
                const newImage = yield this.productService.addImage(body);
                res.status(201).json(newImage);
            }
            catch (error) {
                next(error);
            }
        });
        this.updateImage = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = ProductRequestSchema_1.UpdatedImageProductRequestSchema.parse(req.body);
                const id = +req.params.id;
                const updatedImage = yield this.productService.updateImage(id, body);
                res.json(updatedImage);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteImage = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = +req.params.id;
                const deletedImage = yield this.productService.deleteImage(id);
                res.json(deletedImage);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ImageProductController = ImageProductController;
