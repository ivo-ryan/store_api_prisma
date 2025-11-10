import { HttpError } from "../errors/HttpError";
import { ICheckoutRepositorie, ItemsProps } from "../repositories/CheckoutRepositorie";

export class CheckoutService {
    constructor(readonly checkoutRepositorie: ICheckoutRepositorie){}

    async createCheckout (items: ItemsProps[], customer?: string | null)  {
        if(!items || items.length === 0) throw new HttpError(404, "Items inválidos ");

        const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

        const order = await this.checkoutRepositorie.createOrder(total, items, customer);
        
    }
}