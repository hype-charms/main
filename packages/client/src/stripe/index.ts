import Stripe from "stripe";

export * from "./format-price"
export * from "./go-to-checkout"

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const stripe: Stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY!, { apiVersion: "2022-08-01", }); 