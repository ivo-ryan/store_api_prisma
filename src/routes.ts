import { Router } from "express";
import { cartProductController, categoryController, imageProductController, productController, userController } from "./container";
import { ensureAuth } from "./middlewares/auth";



export const router = Router();

router.get("/users", userController.index);
router.post("/users/email", userController.show);
router.post("/auth/login", userController.login);
router.post("/register", userController.create);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.delete);

router.get("/products", productController.index);
router.post("/products", productController.create);
router.get("/products/newest" , productController.featuredProduct);
router.get("/products/:id", productController.show);
router.put("/products/:id", productController.update);
router.delete("/products/:id", productController.delete);

router.get("/favorites", ensureAuth, productController.getAllFavorites);
router.post("/favorites", ensureAuth, productController.addFavorite);
router.post("/favorites/:productId", ensureAuth, productController.getFavoriteProduct);
router.delete("/favorites/:productId", ensureAuth, productController.deleteFavorite);

router.get("/categories", categoryController.index);
router.post("/categories", categoryController.create);
router.get("/categories/:id", categoryController.show);
router.put("/categories/:id", categoryController.update);
router.delete("/categories/:id", categoryController.delete);

router.get("/cart", ensureAuth, cartProductController.getAllProducts);
router.post("/cart/products", ensureAuth, cartProductController.addProduct);
router.delete("/cart/products/:id", ensureAuth, cartProductController.deleteProduct);

router.post("/images/product", imageProductController.addImage);
router.put("/images/products/:id", imageProductController.updateImage);
router.delete("/images/products/:id", imageProductController.deleteImage);