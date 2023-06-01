import * as stripe from 'stripe'

export enum Currency {
    AUD = 'AUD',
    USD = 'USD',
    EUR = 'EUR',
    NZD = 'NZD'
}

export interface Product<T = ProductMetadata | PackMetadata> {
    id: string;
    prices: PriceReference[];
    object: string;
    active: boolean;
    create: number;
    default_price: string;
    description: string;
    images: string[];
    liveMode: boolean;
    metadata: T;
    name: string;
    package_dimensions: null;
    tax_code: null;
    shippable: null,
    statement_descriptor: null,
    unit_label: null,
    updated: number,
    url: null,
    attributes: [],
    created: number,
    livemode: false,
    billing_scheme: string,
    currency: string,
    custom_unit_amount: null,
    lookup_key: null,
    nickname: null,
    product: string,
    recurring: null,
    tax_behavior: string,
    tiers_mode: null,
    transform_quantity: null,
}

export interface Price {
    id: string,
    object: string,
    active: boolean,
    billing_scheme: string,
    created: number,
    currency: Currency,
    custom_unit_amount: stripe.Stripe.Price.CustomUnitAmount | null,
    livemode: boolean,
    lookup_key: null | string,
    metadata: object,
    nickname: null | string,
    product: string,
    recurring: null | boolean,
    tax_behavior: string,
    tiers_mode: null | boolean,
    transform_quantity: null | number,
    type: string,
    unit_amount: number,
    unit_amount_decimal: string
}

export class PriceReference {
    id?: string;
    currency?: Currency | string;
    custom_unit_amount?: stripe.Stripe.Price.CustomUnitAmount | null;
    lookup_key?: null | string;
    metadata?: object | null;
    product?: any;
    unit_amount?: number | null;
    unit_amount_decimal?: string | null
    constructor(partial: Partial<PriceReference>) {
        Object.assign(this, partial);
    }
}

export class StripeItemReference<T = PackMetadata | ProductMetadata> {
    id?: string
    unit_amount?: number | null
    images?: string[]
    default_price?: string
    created?: number
    description?: string
    metadata?: T
    category?: ProductCategories
    type?: ProductType
    name?: string
    package_dimensions?: null
    shippable?: boolean | null
    unit_label?: null
    currency?: string
    inventory?: number | null;
    constructor(partial: Partial<StripeItemReference<T>>) {
        Object.assign(this, partial);
    }
}

export interface ProductRef {
    id: string;
    images: string[]
    name: string;
    description: string;
    prices: PriceReference[];
}

export enum ProductType {
    PACK = 'pack',
    PRODUCT = 'product',
}

export interface ProductMetadata {
    category: ProductCategories;
    images: string;
    type: ProductType;
    pack: ProductPacks;
}

export interface PackMetadata {
    type: ProductType;
    category: ProductCategories;
    packName: ProductPacks;
    images: string;
}

export enum ProductPacks {
    KAWS = 'kaws-pack',
    NARUTO = 'naruto-pack',
    RICKNMORTY = 'rick-and-morty'
}

export enum ProductCategories {
    ANIME = "anime",
    CARTOONS = "cartoons"
}

export enum CategoryImages {
    "anime" = "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "cartoons" = "/assets/main-backgrounds/rick-and-morty.jpg"
}

export enum ProductFilters {
    FEATURED = 'Featured',
    HIGH_TO_LOW = 'Price, High to Low',
    LOW_TO_HIGH = 'Price, Low to High',
    A_TO_Z = 'Name, A-Z',
    Z_TO_A = 'Name, Z-A',
    NEW_TO_OLD = 'Date, New to Old',
    OLD_TO_NEW = 'Date, Old to New',
}
