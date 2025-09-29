import { HttpError } from "../errors/HttpError";
import { ICartProductRepositorie } from "../repositories/CartProductRepositorie";

export class CartProductService {
    constructor( readonly cartProductRespositorie: ICartProductRepositorie ){}

    async userAndProductExists (userId: number, productId: number) {
        const userExists = await this.cartProductRespositorie.userExists(userId);
        if(!userExists) throw new HttpError(404, "Usuário não encontrado!");
        const productExists = await this.cartProductRespositorie.productExists(productId);
        if(!productExists) throw new HttpError(404, "Product não encontrado!");
    }

    async addProductCart (userId: number , productId: number, change: number = 0 ){
        await this.userAndProductExists(userId, productId);   

        const productAlreadyExists = await this.cartProductRespositorie.updateQuantityInCart(userId, productId, change );

        if(productAlreadyExists  ) return productAlreadyExists ;

        const addProductCart = await this.cartProductRespositorie.addProductInCart(userId, productId);
        return addProductCart
    }

    async removeProductInCart(userId: number , productId: number) {
        await this.userAndProductExists(userId, productId);
        const deleteProductIncart = await this.cartProductRespositorie.removeProductInCart(userId, productId);
        return deleteProductIncart
    }
}