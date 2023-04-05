import { Currency, StripeItemReference, PackMetadata, ProductMetadata, ProductType, ProductCategories, PriceReference, ShippingData, BookingQuoteDto } from "@hype-charms/types";
import { Stripe } from "stripe";
import { inventory } from "../../database";
import { stripe } from "../index"

export namespace products {

    /**
     * 
     * @param amount unit_amount
     * @param currency currency type
     * @param quantity amount of units being calculated
     * @returns 
     */
    export const formatPrice = (amount: number, currency: Currency, quantity: number) => {
        const numberFormat = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency,
            currencyDisplay: 'symbol',
        });
        const parts = numberFormat.formatToParts(amount);
        let zeroDecimalCurrency = true;
        for (const part of parts) {
            if (part.type === 'decimal') {
                zeroDecimalCurrency = false;
            }
        }
        amount = zeroDecimalCurrency ? amount : amount / 100;
        const total = (quantity * amount).toFixed(2) as unknown as bigint;
        return numberFormat.format(total);
    };

    /**
     * 
     * @param data raw stripe product
     * @returns item reference
     */
    export const generateItemReferences = (data: Stripe.Product): StripeItemReference => {
        return {
            id: data.id,
            unit_amount: undefined,
            images: data.images,
            default_price: data.default_price?.toString(),
            created: data.created,
            description: data.description ?? '',
            metadata: data.metadata as unknown as PackMetadata | ProductMetadata,
            type: data.metadata?.type as ProductType,
            category: data.metadata?.category as ProductCategories,
            name: data.name,
            inventory: null,
        }
    }

    /**
     * 
     * @param prices stripe prices
     * @param items stripe items
     * @returns stripe item references with current prices
     */
    export const addPricesToProducts = async (prices: PriceReference[], items: StripeItemReference[]): Promise<StripeItemReference[]> => {
        let data: StripeItemReference[] = [];
        for (let i = 0; i < items.length; i++) {
            for (let x = 0; x < prices.length; x++) {
                if (items[i]?.id === prices[x]?.product) {
                    data.push({
                        ...items[i],
                        unit_amount: prices[x]?.unit_amount
                    })
                }
            }
        }
        return data;
    }

    /**
     * 
     * @param products 
     * @returns updated products array with current inventory value
     */
    export const addInventoryToProducts = async (products: StripeItemReference[]): Promise<StripeItemReference[]> => {
        const data = await inventory.retreiveAllInventory();
        if (data) {
            const references: StripeItemReference[] = [];
            for (let i = 0; i < data.length; i++) {
                products.map((item) => {
                    if (item.id === data[i]?.id) {
                        references.push({ ...item, inventory: Number(data[i].current_stock) })
                    }
                })
            }
            return references;
        } else {
            return products
        }
    }

    /**
     * 
     * @param id product id
     * @returns a single product
     */
    export const fetchById = async (id: string) => {
        return await stripe.products.retrieve(id);
    }

    export const fetchPriceById = async (id: string | undefined) => {
        if (!id) {
            throw new Error('Attempted to retrieve price with undefined')
        }
        return await stripe.prices.retrieve(id);
    }

    /**
     * 
     * @returns all prices from stripe
     */
    export const fetchPrices = async (): Promise<Stripe.Price[]> => {
        const price = await stripe.prices.list({ currency: 'aud', limit: 50 });
        return price.data;
    }

    /**
     * 
     * @returns all items from stripe
     */
    export const fetchItems = async (): Promise<Stripe.Product[]> => {
        return await stripe.products.list({ limit: 100 }).then(data => data.data);
    }

    /**
     * 
     * @param batchAmount sets the amount of items to retrieve per batch
     * @param limit if defined sets the max amount of items to retrieve, otherwise will fetch all
     * @returns returns all
     */
    export const batchItems = async (batchAmount: number, limit?: number): Promise<Stripe.Product[]> => {
        return await stripe.products.list({ limit: batchAmount }).then(data => data.data);
    }

    interface NewCustomerCheckoutProps {
        line_items: Stripe.Checkout.SessionCreateParams.LineItem[],
        domainURL: string | undefined,
        promotion?: string,
        customer_email?: string,
        shipping_data: BookingQuoteDto
    }
    export const generateStipeCheckoutSession = async ({ line_items, domainURL, promotion, customer_email, shipping_data }: NewCustomerCheckoutProps): Promise<Stripe.Checkout.Session | null> => {
        try {
            console.log(shipping_data);
            return stripe.checkout.sessions.create({
                customer_email,
                mode: "payment",
                shipping_address_collection: { allowed_countries: ["AU"] },
                payment_method_types: ["afterpay_clearpay", "card"],
                line_items,
                discounts: [{ promotion_code: promotion }],
                customer_creation: "always",
                success_url: `${domainURL}?checkout="success"`,
                cancel_url: `${domainURL}/checkout`,
                shipping_options: generateShippingData(shipping_data),
            });
        } catch (err: any) {
            console.log(`⚠️  Create stripe checkout failed `, err.message);
            return null
        }
    }

    interface ExistingCustomerCheckoutProps {
        line_items: Stripe.Checkout.SessionCreateParams.LineItem[],
        domain_url: string | undefined,
        promotion?: string,
        customer_id?: string,
        shipping_data: BookingQuoteDto
    }
    export const generateStripeCheckoutSessionWithCustomer = async ({ line_items, domain_url, promotion, customer_id, shipping_data }: ExistingCustomerCheckoutProps): Promise<Stripe.Checkout.Session | null> => {
        try {
            return stripe.checkout.sessions.create({
                customer: customer_id,
                mode: "payment",
                shipping_address_collection: { allowed_countries: ["AU"] },
                shipping_options: generateShippingData(shipping_data),
                payment_method_types: ["afterpay_clearpay", "card"],
                line_items,
                discounts: [{ promotion_code: promotion }],
                customer_update: { address: "auto", name: "auto", shipping: "auto" },
                success_url: `${domain_url}?checkout="success"`,
                cancel_url: `${domain_url}/checkout`,
            });
        } catch (err: any) {
            console.log(`⚠️  Create stripe checkout failed `, err.message);
            return null
        }
    }

    const generateShippingData = (shipping_data: BookingQuoteDto): Stripe.Checkout.SessionCreateParams.ShippingOption[] =>  [{
            shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: { amount: Math.round(shipping_data.total * 100), currency: 'aud' },
                display_name: 'standard shipping',
                delivery_estimate: {
                    minimum: { unit: 'business_day', value: 5 },
                    maximum: { unit: 'business_day', value: 7 },
                },
            },
        }]

    export const fetchAllProductReferences = async (): Promise<StripeItemReference[] | null> => {
        const prices = await fetchPrices();
        return await fetchItems()
            .then(data => data.map(item => generateItemReferences(item)))
            .then(data => addPricesToProducts(prices, data))
            .then(data => addInventoryToProducts(data))
            .catch(err => {
                console.log(err)
                return null;
            });
    }

    export const fetchProductReferenceById = async (id: string): Promise<StripeItemReference[] | null> => {
        return await fetchById(id)
            .then(data => generateItemReferences(data))
            .then(async data => [data, await fetchPriceById(data.default_price)])
            .then(([item, price]) => addPricesToProducts([price], [item] as StripeItemReference[]))
            .then(data => addInventoryToProducts(data))
            .catch(err => {
                console.log(err)
                return null;
            });
    }

    export const filter = async (): Promise<{
        byType: (data: { products: StripeItemReference[], _type?: ProductType }) => StripeItemReference[],
        byCategory: (data: { products: StripeItemReference[], _category?: ProductCategories }) => StripeItemReference[]
    }> => {
        const byCategory = (data: { products: StripeItemReference[], _category?: ProductCategories }) => data.products.filter(item => item.category === data._category);
        const byType = (data: { products: StripeItemReference[], _type?: ProductType }) => data.products.filter(item => item.type === data._type);
        return { byCategory, byType }
    }

}