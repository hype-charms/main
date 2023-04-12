import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { env } from "../../../env/server.mjs";
import { stripe } from "../../../shared-util/context/stripe"
import { sendDisputeReceivedEmail } from "../../../shared-util/sendgrid/sendgrid";
import { buffer } from 'micro'
import { disputes } from "@prisma/client";
import { prisma } from '../../../shared-util/context/client'

export const config = {
    api: {
        bodyParser: false,
    },
};
export default async function stripeDisputes(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = await buffer(req);
        const signature = req.headers['stripe-signature'] as string;
        const event = stripe.webhooks.constructEvent(body, signature, env.DISPUTES_SECRET);
        const stripe_dispute = event.data.object as Stripe.Dispute;
        switch (event.type) {
            case 'charge.dispute.created':
                const dispute = createStripeDispute(stripe_dispute);
                if (dispute) {
                    await sendDisputeReceivedEmail(dispute.evidence?.customer_email_address, dispute.id);
                    await insertDisputeTable(dispute)
                }
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

const createStripeDispute = (dispute: Stripe.Dispute): disputes => {
    const evidence_details = {
        due_by: dispute.evidence_details.due_by ?? null,
        has_evidence: dispute.evidence_details.has_evidence ?? null,
        past_due: dispute.evidence_details.past_due ?? null,
    }
    const evidence = {
        billing_address: dispute.evidence.billing_address ?? null,
        customer_email_address: dispute.evidence.customer_email_address ?? null,
        duplicate_charge_documentation: JSON.stringify(dispute.evidence.duplicate_charge_documentation),
    }
    return {
        id: dispute.id ?? null,
        amount: dispute.amount ?? null,
        charge: JSON.stringify(dispute.charge),
        created: dispute.created ?? null,
        evidence,
        evidence_details,
        is_charge_refundable: dispute.is_charge_refundable ?? null,
        network_reason_code: dispute.network_reason_code ?? null,
    }
}

const insertDisputeTable = async (dispute: disputes): Promise<disputes> => {
    await prisma.$connect()
    return await prisma.disputes.create({ data: dispute }).then(async (data) => {
        await prisma.$disconnect()
        return data;
    });
}