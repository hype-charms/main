export class CartProduct {
    default_price?: string;
    description?: string;
    id?: string;
    images?: string[];
    name?: string;
    quantity?: number;
    unit_amount?: number | null;
    constructor(partial: Partial<CartProduct>) {
        Object.assign(this, partial);
    }
}

export interface Cart {
    cartId: string;
    cartItems: CartProduct[];
}
