import { Order, Payment } from "@prisma/client";

export interface ItemsProps {
    productId: number;
    name: string;
    price: number;
    quantity: number;
    image: string
}

export type PaymentStatus = "PAID" | "FAILED";

export type OrderStatus = "PAID" | "CANCELLED" | "PENDING"

export interface ICheckoutRepositorie {
    getOrders: (userId: number) => Promise<Order[]>;
    createOrder: (total: number, items: ItemsProps[],userId: number, customer?: string | null) => Promise<Order>;
    createPayment: (orderId: number, amount: number) => Promise<Payment>;
    updatePayment: (paymentId: number , status:PaymentStatus ) => Promise<Payment>;
    updateOrder: (orderId: number, status: OrderStatus) => Promise<Order>;

}