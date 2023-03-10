export * from "./product"
export * from "./customer"

import * as Stripe from "stripe";

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const stripe: Stripe.default = require("stripe")(process.env.STRIPE_PRIVATE_KEY!, { apiVersion: "2022-08-01", });   