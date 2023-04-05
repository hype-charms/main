import { BookingQuoteDto, CartProduct, ShippingData } from "@hype-charms/types";
import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";

export const loadCheckout = async (cart: CartProduct[], basePath: string, shippingData: BookingQuoteDto | null, email?: string) => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    const res = await fetch(`${basePath}/api/checkout`, {
        method: "POST",
        body: JSON.stringify({
            line_items: cart?.map((product: CartProduct) => ({ quantity: product.quantity, price: product.default_price })),
            email,
            shippingData
        }),
        headers: { "content-type": 'application/json' }
    })
    const session: Stripe.Response<Stripe.Checkout.Session> = await res.json();
    if (!stripe) {
        throw new Error('stripe is undefined')
    } else {
        await stripe.redirectToCheckout({
            sessionId: session.id,
        });
    }
}