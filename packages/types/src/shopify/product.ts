export interface ProductImage {
    edges: { node: { id: string, src: string } }[];
}

export interface ShopifyProductResponse {
    body?: {
        data?: {
            products?: {
                edges?: ShopifyNode<ShopifyItemReference>[]
            };
        }
    }
}

export interface ShopifyNode<T> {
    node: T
}

export class ShopifyItemReference {
    images?: ProductImage;
    title?: string;
    id?: string;
    description?: string;
    constructor(partial: Partial<ShopifyItemReference>) {
        Object.assign(this, partial);
    }
}