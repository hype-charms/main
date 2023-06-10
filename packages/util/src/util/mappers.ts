import { HypeItemReference, ProductCategories, ProductType, ShopifyItemReference } from "@hype-charms/types";
import Stripe from "stripe";

export const MapStripeProductReferencesToHypeItemReference = (data: Stripe.Product): HypeItemReference => {
    return {
        id: data.id,
        unit_amount: undefined,
        images: data.images,
        default_price: data.default_price?.toString(),
        created: data.created,
        description: data.description ?? '',
        metadata: data.metadata as unknown as JSON,
        type: data.metadata?.type as ProductType,
        category: data.metadata?.category as ProductCategories,
        name: data.name,
        inventory: null,
    }
}

export const MapShopifyProductReferencesToHypeItemReference = (data: ShopifyItemReference): HypeItemReference => {
    return {
        id: data.id,
        unit_amount: undefined,
        images: data.images?.edges.map(({ node }) => node.src),
        default_price: "",
        created: -1,
        description: data.description ?? '',
        metadata: undefined,
        type: undefined,
        category: undefined,
        name: data.title,
        inventory: null,
    }
}