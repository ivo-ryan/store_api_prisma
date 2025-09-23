import { CartProduct, User, Product } from "@prisma/client";
import { ICartProductRepositorie } from "../CartProductRepositorie";
import { prisma } from "../../database/database";

export class CartProductPrismaRepositorie implements ICartProductRepositorie {

    async cartIdExists (userId: number) {
        const user = await prisma.user.findUniqueOrThrow({
            where: { id: userId },
            include: { cart: { select: { id: true } } }
        });

        return user.cart?.id ?? (await prisma.cart.create({ data: { userId } })).id;
    }

    async addProductInCart (userId: number, productId: number):  Promise<CartProduct>{
       const  cartId = await this.cartIdExists(userId);
        return prisma.cartProduct.create({ 
            data: { 
                cartId,
                productId
             }
         })
    }

    async removeProductInCart (userId: number, productId: number):  Promise<CartProduct>{
        const  cartId = await this.cartIdExists(userId);
        return prisma.cartProduct.delete({ where: { cartId_productId: { cartId, productId } } });
    }

    userExists (userId: number):  Promise<User | null>{
        return prisma.user.findUnique({ where: { id: userId } });
    }

    productExists (productId: number):  Promise<Product | null>{
        return prisma.product.findUnique({ where: { id: productId } });
    }


}