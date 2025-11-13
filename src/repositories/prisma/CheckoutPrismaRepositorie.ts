import { Order, Payment } from "@prisma/client";
import { ICheckoutRepositorie, ItemsProps, OrderStatus, PaymentStatus } from "../CheckoutRepositorie";
import { prisma } from "../../database/database";

export class CheckoutPrismaRepositorie implements ICheckoutRepositorie{

    getOrders (userId: number): Promise<Order[]>{
        return prisma.order.findMany({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: {
                            include: {
                                images: true
                            }
                        }
                    }
                },
                payment: true
            }
        })
    }

    createOrder (total: number, items: ItemsProps[],userId: number, customer?: string | null) : Promise<Order>{
        return prisma.order.create({
            data: {
                userId,
                total,
                customer,
                items:{
                    create: items.map(i => ({
                        productId: i.productId,
                        name: i.name,
                        price: i.price,
                        quantity: i.quantity
                    }))
                }
            },

            include: { items: true }
        })
    }

    createPayment (orderId: number, amount: number) : Promise<Payment>{
        return prisma.payment.create({
            data: {
            orderId,
            provider: "simulated",
            status: "PENDING",
            amount
            },
            include: { order: true }
        })
    }

    updatePayment (paymentId: number, status: PaymentStatus) : Promise<Payment>{
        return prisma.payment.update({
            where: { id: paymentId },
            data: { status }
        })
    }

    updateOrder (orderId: number, status: OrderStatus ) : Promise<Order>{
        return prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                status
            }
        })
    }
}