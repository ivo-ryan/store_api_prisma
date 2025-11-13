"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryPrismaRepository = void 0;
const database_1 = require("../../database/database");
class CategoryPrismaRepository {
    findMany() {
        return database_1.prisma.category.findMany();
    }
    create(attributes) {
        return database_1.prisma.category.create({ data: attributes });
    }
    findUnique(id) {
        return database_1.prisma.category.findUnique({
            where: { id },
            include: {
                products: {
                    include: { images: true }
                }
            }
        });
    }
    upadate(id, attributes) {
        return database_1.prisma.category.update({
            where: { id },
            data: attributes
        });
    }
    delete(id) {
        return database_1.prisma.category.delete({ where: { id } });
    }
}
exports.CategoryPrismaRepository = CategoryPrismaRepository;
