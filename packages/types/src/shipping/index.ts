import Stripe from "stripe"

export interface Geolocation {
    street_number?: string,
    route?: string,
    locality?: string,
    administrative_area_level_2?: string,
    administrative_area_level_1?: string,
    country?: string,
    postal_code?: string
}

export interface ShippingData extends Stripe.Checkout.Session.ShippingOption { }