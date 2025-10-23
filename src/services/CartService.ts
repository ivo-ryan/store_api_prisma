import { HttpError } from "../errors/HttpError";
import { ICartProductRepositorie } from "../repositories/CartProductRepositorie";

export class CartProductService {
    constructor( readonly cartProductRespositorie: ICartProductRepositorie ){}

    async productExists ( productId: number) {
        const productExists = await this.cartProductRespositorie.productExists(productId);
        if(!productExists) throw new HttpError(404, "Product não encontrado!");
    }

    async addProductCart (userId: number , productId: number, change: number = 0 ){
        await this.productExists( productId);   

        const productAlreadyExists = await this.cartProductRespositorie.updateQuantityInCart(userId, productId, change );

        if(productAlreadyExists  ) return productAlreadyExists ;

        const addProductCart = await this.cartProductRespositorie.addProductInCart(userId, productId);
        return addProductCart
    }

    async removeProductInCart(userId: number , productId: number) {
        await this.productExists( productId);
        const deleteProductIncart = await this.cartProductRespositorie.removeProductInCart(userId, productId);
        return deleteProductIncart
    }

    async getAllProducts(userId: number) {
        const productsCart = await this.cartProductRespositorie.getProductsInCart(userId);
        return productsCart
    }
}