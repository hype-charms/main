import Stripe from "stripe";
import { stripe } from "..";

export namespace customer {

    export const createCustomerSpecificPromotionCode = async (coupon: string, customer: string) => {
        return await stripe.promotionCodes.create({
            coupon,
            customer
        });
    }

    export const appendPromotionCodeToCustomer = async (customer_id: string, promotion_id: string) => {
        return stripe.customers.update(
            customer_id,
            { promotion_code: promotion_id }
        );
    }

    export const fetchPromotionCodeById = async (id: string) => {
        return await stripe.customers.retrieve(id).then(data => data)  
    }

    export const fetchCustomer = async (id: string | undefined) => {
        if (!id) {
            throw new Error('id is undefined')
        }
        return await stripe.customers.retrieve(id) as unknown as Promise<Stripe.Response<Stripe.Customer>>
    }

    export const createCustomer = async (props: { email: string }): Promise<Stripe.Customer> => {
        return await stripe.customers.create(props)
    }

}