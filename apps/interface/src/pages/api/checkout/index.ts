/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import { products, customer, email } from "@hype-charms/util"
import Stripe from "stripe";
import { Product, ShippingData } from "@hype-charms/types";

const checkout = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const { line_items, _email, shippingData } = req.body as { line_items: any, _email: string, shippingData: ShippingData}
        if (!line_items) {
            throw new Error("line_items is undefined")
        }
        const customerId = await email.retreiveByEmail(_email).then(data => data?.stripe_customer_id)
        if (!customerId) {
            const session = await products.generateStipeCheckoutSession({
                line_items,
                domainURL: process.env.CLIENT_URL,
                customer_email: _email,
                shipping_data: shippingData,
            }
            );
            if (session) {
                res.status(200).send(session)
            } else {
                res.status(500).send({ error: new Error('FAILED_TO_LOAD_RESOURCES') })
            }
        } else {
            const customerPromotion = await customer.fetchCustomer(customerId)
            const session = await products.generateStripeCheckoutSessionWithCustomer({
                line_items,
                domain_url: process.env.CLIENT_URL,
                customer_id: customerId,
                promotion: customerPromotion.discount?.promotion_code as string | undefined,
                shipping_data: shippingData,
            });
            if (session) {
                res.status(200).send(session)
            } else {
                res.status(500).send({ error: new Error('FAILED_TO_LOAD_RESOURCES') })
            }
        }
    }
};


export default checkout;
