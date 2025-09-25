import { Router } from "express";
import { cartProductController, categoryController, imageProductController, productController, userController } from "./container";



export const router = Router();

router.get("/users", userController.index);
router.get("/users/email", userController.show);
router.post("/register", userController.create);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.delete);

router.get("/products", productController.index);
router.post("/products", productController.create);
router.get("/products/:id", productController.show);
router.put("/products/:id", productController.update);
router.delete("/products/:id", productController.delete);

router.get("/categories", categoryController.index);
router.post("/categories", categoryController.create);
router.get("/categories/:id", categoryController.show);
router.put("/categories/:id", categoryController.update);
router.delete("/categories/:id", categoryController.delete);

router.post("/cart/products", cartProductController.addProduct);
router.delete("/cart/products", cartProductController.deleteProduct);

router.post("/images/product", imageProductController.addImage);
router.put("/images/products/:id", imageProductController.updateImage);
router.delete("/images/products/:id", imageProductController.deleteImage);