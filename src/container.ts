import { CartProductController } from "./controllers/CartProductControllers";
import { CategoryController } from "./controllers/CategoryControllers";
import { CheckoutController } from "./controllers/CheckoutControllers";
import { ImageProductController } from "./controllers/ImageProductController";
import { ProductController } from "./controllers/ProductControllers";
import { UsersController } from "./controllers/UsersControllers";
import { CartProductPrismaRepositorie } from "./repositories/prisma/CartProductPrismaRepositorie";
import { CategoryPrismaRepository } from "./repositories/prisma/CategoryPrismaRepositorie";
import { CheckoutPrismaRepositorie } from "./repositories/prisma/CheckoutPrismaRepositorie";
import { ProductPrismaRepositorie } from "./repositories/prisma/ProductPrismaRepositorie";
import { UserPrismaRepositorie } from "./repositories/prisma/UserPrismaRepositorie";
import { CartProductService } from "./services/CartService";
import { CategoryService } from "./services/CategoryService";
import { CheckoutService } from "./services/CheckoutService";
import { JwtService } from "./services/JwtService";
import { ProductService } from "./services/ProductService";
import { UserService } from "./services/UserService";


const categoryRepositorie = new CategoryPrismaRepository();
const productRepositorie = new ProductPrismaRepositorie();
const cartProductRepositorie = new CartProductPrismaRepositorie();
const userRepositorie = new UserPrismaRepositorie();
const checkoutRepositorie = new CheckoutPrismaRepositorie();

const categoryService = new CategoryService(categoryRepositorie);
const productService = new ProductService(productRepositorie);
const cartProductService = new CartProductService(cartProductRepositorie);
const checkoutServie = new CheckoutService(checkoutRepositorie, cartProductRepositorie);

const secret = process.env.SECRET_KEY || "chave-super-secreta";
export const jwt = new JwtService(secret);

export const userService = new UserService(userRepositorie, jwt);

export const categoryController = new CategoryController(categoryService);
export const productController = new ProductController(productService);
export const cartProductController = new CartProductController(cartProductService);
export const userController = new UsersController(userService);
export const imageProductController = new ImageProductController(productService);
export const checkoutController = new CheckoutController(checkoutServie);