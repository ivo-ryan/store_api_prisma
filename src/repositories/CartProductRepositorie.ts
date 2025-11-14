import { Cart, CartProduct, Product, User } from "@prisma/client";

export interface ICartProductRepositorie {
    addProductInCart: (userId: number, productId: number) => Promise<CartProduct>;
    removeProductInCart: (userId: number, productId: number) => Promise<CartProduct>;
    getProductsInCart: (userId: number) => Promise<CartProduct[]>;
    productExists: (productId: number) => Promise<Product | null >;
    updateQuantityInCart: (userId: number, productId: number, change: number) => Promise<CartProduct | null>;
    cleanCart: (userId: number) => Promise<void>;
}