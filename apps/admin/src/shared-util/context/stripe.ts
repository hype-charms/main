import * as Stripe from "stripe";
import { env } from '../../env/server.mjs'

declare global{ 
    const stripe: Stripe.default
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const stripe: Stripe.default = require("stripe")(env.STRIPE_PRIVATE_KEY, { apiVersion: "2022-08-01", });
