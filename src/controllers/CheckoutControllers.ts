import { Handler } from "express"
import { CheckoutRequestSchema } from "./schema/CheckoutRequestSchema"

export class CheckoutController {

    create: Handler = async (req, res , next) => {
        try {
            const { items, customer } = CheckoutRequestSchema.parse(req.body);
            
        } catch (error) {
            next(error)
        }
    }
}