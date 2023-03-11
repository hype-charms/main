import { SubState } from '../../../models';
import { NextApiRequest, NextApiResponse } from 'next';
import { sendWelcomeEmail } from '../../../utils/sendgrid/sendgrid';
import { customer, email } from '@hype-charms/util';

export default async function EmailList(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    switch (req.method) {
        case "GET":
            try {
                if (typeof req.query.email === "object" || !req.query.email) {
                    throw new Error("query sent as object or undefined")
                }
                const email_table = await email.retreiveByEmail(req.query.email)
                    .catch(err => console.log(err));
                res.status(200).send({ email: email_table?.email })
            } catch (err) {
                console.log(err);
                res.status(500).send(err)
            }
            break;
        case "POST":
            try {
                const result = await email.insert(req.body.email);
                if (result) {
                    await sendWelcomeEmail(req.body.email);
                }
                res.status(200).send(result);
            } catch (err) {
                console.log(err);
                res.status(500).send(err);
            }
            break;
        case "PUT":
            try {
                const result = await email.updateVerification(req.body.email);
                if (result.result === SubState.USER_VERIFIED) {
                    const result = await customer.createCustomer({ email: req.body.email })
                    const promo = await customer.createCustomerSpecificPromotionCode(process.env.NEXT_PUBLIC_WELCOME_COUPON!, result.id);
                    await email.updateStripeCustomerId(req.body.email, result.id);
                    await customer.appendPromotionCodeToCustomer(result.id, promo.id)
                    res.status(200).send({ result: SubState.USER_VERIFIED });
                } else {
                    res.status(200).send({ result: SubState.ALREADY_VERIFIED })
                }
            } catch (err) {
                console.log(err);
                res.status(500);
            }
            break;
        default: res.status(500).send({ error: "METHOD_NOT_PERMITTED" })
    }
}