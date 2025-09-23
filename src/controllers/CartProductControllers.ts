import { Handler } from "express";
import { CartProductService } from "../services/CartService";

export class CartProductController {
    constructor(readonly cartProductService: CartProductService) {}

    addProduct: Handler = async ( req , res , next ) => {
        try {
            const { userId, productId } = req.body;
            const newProductInCart = await this.cartProductService.addProductCart(userId, productId);
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