import { CartProductController } from "./controllers/CartProductControllers";
import { CategoryController } from "./controllers/CategoryControllers";
import { ProductController } from "./controllers/ProductControllers";
import { UsersController } from "./controllers/UsersControllers";
import { CartProductPrismaRepositorie } from "./repositories/prisma/CartProductPrismaRepositorie";
import { CategoryPrismaRepository } from "./repositories/prisma/CategoryPrismaRepositorie";
import { ProductPrismaRepositorie } from "./repositories/prisma/ProductPrismaRepositorie";
import { UserPrismaRepositorie } from "./repositories/prisma/UserPrismaRepositorie";
import { CartProductService } from "./services/CartService";
import { CategoryService } from "./services/CategoryService";
import { ProductService } from "./services/ProductService";
import { UserService } from "./services/UserService";


const categoryRepositorie = new CategoryPrismaRepository();
const productRepositorie = new ProductPrismaRepositorie();
const cartProductRepositorie = new CartProductPrismaRepositorie();
const userRepositorie = new UserPrismaRepositorie();

const categoryService = new CategoryService(categoryRepositorie);
const productService = new ProductService(productRepositorie);
const cartProductService = new CartProductService(cartProductRepositorie);
const userService = new UserService(userRepositorie);

export const categoryController = new CategoryController(categoryService);
export const productController = new ProductController(productService);
export const cartProductController = new CartProductController(cartProductService);
export const userController = new UsersController(userService);