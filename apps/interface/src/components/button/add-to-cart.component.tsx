import { StripeItemReference } from "@hype-commerce/types";
import { FC } from "react";
import { useAddItemToCart } from "../../+state/hooks";
import { CartProduct } from "../../models/cart.model";

export const AddToCartComponent: FC<{ product: StripeItemReference, quantity: number, cartHasItem: boolean }> = ({ product, quantity, cartHasItem }) => {

    const addItemToCart = useAddItemToCart();
    const addToCart = () => {
        addItemToCart(new CartProduct({
            default_price: product.default_price,
            description: product.description,
            id: product.id,
            images: product.images,
            name: product.name,
            quantity,
            unit_amount: product.unit_amount,
        }))
    };
    return <>{product.inventory && product.inventory > 0 ?
        <button
            type="button"
            aria-label={!cartHasItem ? `Add ${product.name} to your cart` : `${product.name} has already been added to your cart`}
            disabled={cartHasItem}
            className={ProductsClasses.addToCart(cartHasItem)}
            onClick={addToCart}>
            {!cartHasItem ? "Add to cart" : "Added"}
        </button>
        :
        <button
            disabled
            className={ProductsClasses.soldOutButton}>
            Sold out
        </button>}</>
}

const ProductsClasses = {
    addToCart: (added: boolean) => `${!added ? 'hover:opacity-80' : 'opacity-60'} text-primary w-full h-12 transition-all rounded py-8 bg-secondary-dark w-full flex flex-col gap-2 items-center justify-center`,
    soldOutButton: ` opacity-60 text-primary w-full h-12 transition-all bg-secondary-dark`
}