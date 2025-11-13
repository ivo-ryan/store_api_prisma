"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutPrismaRepositorie = void 0;
const database_1 = require("../../database/database");
class CheckoutPrismaRepositorie {
    getOrders(userId) {
        return database_1.prisma.order.findMany({
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
        });
    }
    createOrder(total, items, userId, customer) {
        return database_1.prisma.order.create({
            data: {
                userId,
                total,
                customer,
                items: {
                    create: items.map(i => ({
                        productId: i.productId,
                        name: i.name,
                        price: i.price,
                        quantity: i.quantity
                    }))
                }
            },
            include: { items: true }
        });
    }
    createPayment(orderId, amount) {
        return database_1.prisma.payment.create({
            data: {
                orderId,
                provider: "simulated",
                status: "PENDING",
                amount
            },
            include: { order: true }
        });
    }
    updatePayment(paymentId, status) {
        return database_1.prisma.payment.update({
            where: { id: paymentId },
            data: { status }
        });
    }
    updateOrder(orderId, status) {
        return database_1.prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                status
            }
        });
    }
}
exports.CheckoutPrismaRepositorie = CheckoutPrismaRepositorie;
