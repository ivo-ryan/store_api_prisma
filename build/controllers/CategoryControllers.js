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
exports.CategoryController = void 0;
const CategoryRequestschema_1 = require("./schema/CategoryRequestschema");
class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
        this.index = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield this.categoryService.findAllCategory();
                res.json(categories);
            }
            catch (error) {
                next(error);
            }
        });
        this.show = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = +req.params.id;
                const category = yield this.categoryService.findByIdCategory(id);
                res.json(category);
            }
            catch (error) {
                next(error);
            }
        });
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = CategoryRequestschema_1.CategoryRequestSchema.parse(req.body);
                const newCategory = yield this.categoryService.createCategory(body);
                res.status(201).json(newCategory);
            }
            catch (error) {
                next(error);
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = +req.params.id;
                const body = CategoryRequestschema_1.UpdateCategoryRequestSchema.parse(req.body);
                const updatedCategory = yield this.categoryService.updateCategory(id, body);
                res.json(updatedCategory);
            }
            catch (error) {
                next(error);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = +req.params.id;
                const deletedCategory = yield this.categoryService.deleteCategory(id);
                res.json(deletedCategory);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.CategoryController = CategoryController;
