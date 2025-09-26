import { Handler } from "express";
import { CartProductService } from "../services/CartService";
import { CartProductRequestSchema } from "./schema/CartProductRequestSchema";

export class CartProductController {
    constructor(readonly cartProductService: CartProductService) {}

    addProduct: Handler = async ( req , res , next ) => {
        try {
            const { userId, productId , change } = CartProductRequestSchema.parse(req.body);
            const newProductInCart = await this.cartProductService.addProductCart(userId, productId, change);
            res.status(201).json(newProductInCart);
        } catch (error) {
            next(error)
        }
    }

    deleteProduct: Handler = async ( req , res , next ) => {
        try {
            const { userId, productId } = req.body;
            const deleteProductIncart = await this.cartProductService.removeProductInCart(userId, productId);
            res.json(deleteProductIncart); 
        } catch (error) {
            next(error)
        }
    }
}