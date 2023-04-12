import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { env } from "../../../env/server.mjs";
import { stripe } from "../../../shared-util/context/stripe"
import { prisma } from "../../../shared-util/context/client"
import { sendOrderConfirmationEmail, sendOrderFailedEmail } from "../../../shared-util/sendgrid/sendgrid";
import { buffer } from 'micro'
import { order_list } from "@prisma/client";

export const config = {
    api: {
        bodyParser: false,
    },
};
export default async function stripeCharges(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = await buffer(req);
        const signature = req.headers['stripe-signature'] as string;
        const event = stripe.webhooks.constructEvent(body, signature, env.CHARGES_SECRET);
        const charge = event.data.object as Stripe.Charge;
        switch (event.type) {
            case 'charge.succeeded':
                const data = createStripeProductOrder(charge);
                if (data) {
                    await insertOrderTable(data);
                    await sendOrderConfirmationEmail(data.billing?.email, data.id, data.receipt)
                }
                break;
            case 'charge.failed':
                const failed = createStripeProductOrder(charge);
                if (failed) {
                    await sendOrderFailedEmail(charge.billing_details.email, charge.id)
                }
                break;
            case 'checkout.session.completed':
                const items = await stripe.checkout.sessions.listLineItems(charge.id)
                await Promise.all(items.data.map(async item => {
                    if (item.price?.id) {
                        const data = await stripe.prices.retrieve(item.price.id);
                        if (typeof data.product === "string") upsertInventoryTable(data.product, 1);
                        else if (typeof data.product === "object") upsertInventoryTable(data.product.id, item.quantity ?? 1);
                    }
                }));
                break;
            default:
                console.log(`Unhandled event type ${event.type}.`);
        }
        res.status(200).send('')
    } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err);
        return res.status(400).send(err);
    }
}

const insertOrderTable = async (order: order_list): Promise<order_list | undefined> => {
    return await prisma?.order_list.create({ data: order }).then((data) => {
        prisma?.$disconnect()
        return data
    });
}

const upsertInventoryTable = async (product_id: string, quantity: number) => {
    await prisma.$connect();
    const stock = await prisma.inventory.findUnique({ where: { id: product_id }, select: { current_stock: true } });
    if (stock) {
        return await prisma.inventory.updateMany({ where: { id: product_id }, data: { current_stock: stock.current_stock - quantity } }).then((data) => {
            prisma?.$disconnect()
            return data
        });
    }
}

const createStripeProductOrder = (charge: Stripe.Charge): order_list => {
    const shipping = {
        ...charge.shipping,
        carrier: charge.shipping?.carrier ?? null,
        address: charge.shipping?.address ?? null,
        name: charge.shipping?.name ?? null,
        phone: charge.shipping?.phone ?? null,
        tracking_number: charge.shipping?.tracking_number ?? null,
        status: null
    }
    const outcome = {
        network_status: charge.outcome?.network_status ?? null,
        reason: charge.outcome?.reason ?? null,
        risk_level: charge.outcome?.risk_level ?? null,
        risk_score: charge.outcome?.risk_score ?? null,
        rule: JSON.stringify(charge.outcome?.rule),
        seller_message: charge.outcome?.seller_message ?? null,
        type: charge.outcome?.type ?? null
    }
    const billing = {
        address: charge.billing_details?.address ?? null,
        name: charge.billing_details?.name ?? null,
        phone: charge.billing_details?.phone ?? null,
        email: charge.billing_details?.email ?? null,
    }
    return {
        id: charge.id,
        amount_paid: charge.amount,
        billing,
        shipping,
        outcome,
        receipt: charge.receipt_url,
        status: charge.status,
        disputed: charge.disputed,
        dispute: JSON.stringify(charge.dispute)
    }
}