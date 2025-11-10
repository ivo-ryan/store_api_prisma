import { Order } from "@prisma/client";

export interface ItemsProps {
    productId: number;
    name: string;
    price: number;
    quantity: number;
}

export interface ICheckoutRepositorie {
    createOrder: (total: number, items: ItemsProps[], customer?: string | null) => Promise<Order>
}