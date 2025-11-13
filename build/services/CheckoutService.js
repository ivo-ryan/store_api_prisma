"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutService = void 0;
const HttpError_1 = require("../errors/HttpError");
class CheckoutService {
    constructor(checkoutRepositorie) {
        this.checkoutRepositorie = checkoutRepositorie;
    }
    getAllOrders(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield this.checkoutRepositorie.getOrders(userId);
            return orders;
        });
    }
    updatedPayment(paymentId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!["PAID", "FAILED"].includes(status))
                throw new HttpError_1.HttpError(404, "invalid status");
            const payment = yield this.checkoutRepositorie.updatePayment(paymentId, status);
            if (status === "PAID")
                yield this.checkoutRepositorie.updateOrder(payment.orderId, "PAID");
            else if (status === "FAILED")
                yield this.checkoutRepositorie.updateOrder(payment.orderId, "PENDING");
            return { payment, orderId: payment.orderId };
        });
    }
    createCheckout(items, userId, customer) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!items || items.length === 0)
                throw new HttpError_1.HttpError(404, "Items inválidos ");
            const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
            const order = yield this.checkoutRepositorie.createOrder(total, items, userId, customer);
            if (!order)
                throw new HttpError_1.HttpError(404, "Order ainda não foi criado!");
            const payment = yield this.checkoutRepositorie.createPayment(order.id, total);
            return payment;
        });
    }
}
exports.CheckoutService = CheckoutService;
