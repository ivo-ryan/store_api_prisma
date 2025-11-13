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
exports.CheckoutController = void 0;
const CheckoutRequestSchema_1 = require("./schema/CheckoutRequestSchema");
class CheckoutController {
    constructor(checkoutService) {
        this.checkoutService = checkoutService;
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const name = req.user.name;
                const userId = req.user.id;
                const { items } = CheckoutRequestSchema_1.CheckoutRequestSchema.parse(req.body);
                const orderAndPayment = yield this.checkoutService.createCheckout(items, userId, name);
                res.status(201).json(orderAndPayment);
            }
            catch (error) {
                next(error);
            }
        });
        this.getAllOrders = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const orders = yield this.checkoutService.getAllOrders(userId);
                res.json(orders);
            }
            catch (error) {
                next(error);
            }
        });
        this.updatedPayment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const paymentId = +req.params.paymentId;
                const { status } = CheckoutRequestSchema_1.UpdatedPaymentRequestSchema.parse(req.body);
                const updatePayment = yield this.checkoutService.updatedPayment(paymentId, status);
                res.json(updatePayment);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.CheckoutController = CheckoutController;
