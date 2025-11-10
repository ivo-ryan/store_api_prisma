import { Order } from "@prisma/client";
import { ICheckoutRepositorie, ItemsProps } from "../CheckoutRepositorie";
import { prisma } from "../../database/database";

export class CheckoutPrismaRepositorie implements ICheckoutRepositorie{
    createOrder (total: number, items: ItemsProps[], customer?: string | null) : Promise<Order>{
        return prisma.order.create({
            data: {
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
}