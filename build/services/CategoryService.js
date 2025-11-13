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
exports.CategoryService = void 0;
const HttpError_1 = require("../errors/HttpError");
class CategoryService {
    constructor(categoryRepositorie) {
        this.categoryRepositorie = categoryRepositorie;
    }
    findAllCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield this.categoryRepositorie.findMany();
            return categories;
        });
    }
    createCategory(attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCategory = yield this.categoryRepositorie.create(attributes);
            return newCategory;
        });
    }
    categoryExists(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryRepositorie.findUnique(id);
            if (!category)
                throw new HttpError_1.HttpError(404, "Categoria não foi encontrada!");
        });
    }
    findByIdCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.categoryExists(id);
            const category = yield this.categoryRepositorie.findUnique(id);
            return category;
        });
    }
    updateCategory(id, attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.categoryExists(id);
            const updateCategory = yield this.categoryRepositorie.upadate(id, attributes);
            return updateCategory;
        });
    }
    deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.categoryExists(id);
            const removeCategory = yield this.categoryRepositorie.delete(id);
            return removeCategory;
        });
    }
}
exports.CategoryService = CategoryService;
