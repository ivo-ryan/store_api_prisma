import { Handler } from "express"
import { CheckoutRequestSchema, UpdatedPaymentRequestSchema } from "./schema/CheckoutRequestSchema"
import { CheckoutService } from "../services/CheckoutService";
import { AuthenticatedRequest } from "../middlewares/auth";

export class CheckoutController {
    constructor( readonly checkoutService: CheckoutService ){}

    create: Handler = async (req: AuthenticatedRequest, res , next) => {
        try {
            const name = req.user!.name;
            const userId = req.user!.id;
            const { items } = CheckoutRequestSchema.parse(req.body);
            const orderAndPayment = await this.checkoutService.createCheckout(items,userId, name);
            res.status(201).json(orderAndPayment);
        } catch (error) {
            next(error)
        }
    }

    getAllOrders: Handler = async (req: AuthenticatedRequest, res , next) => {
        try {
            const userId = req.user!.id;
            const orders = await this.checkoutService.getAllOrders(userId);
            res.json(orders);
        } catch (error) {
            next(error)
        }
    }

    updatedPayment: Handler = async (req: AuthenticatedRequest, res , next) => {
        try {
            const  paymentId  = +req.params.paymentId;
            const { status } = UpdatedPaymentRequestSchema.parse(req.body);
            const updatePayment = await this.checkoutService.updatedPayment(paymentId, status);
            res.json(updatePayment);
        } catch (error) {
            next(error)
        }
    }
}