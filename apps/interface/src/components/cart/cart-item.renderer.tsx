import { useCallback } from "react";
import Image from 'next/image'
import { useRemoveItemFromCart } from "../../+state/hooks";
import { CartProduct } from "../../models";
import { QuantityButtonsComponent } from "../button/quantity-buttons.component";

export const CartItemRenderer = ({ classes, item }: {
    item: CartProduct;
    classes: Partial<{
        wrapper: (showCart: boolean) => void;
        productRow: string;
        controlButton: string;
        controlsContainer: string;
        nameTag: string;
        productContainer: string;
    }>;
}) => {

    const removeItemFromCart = useRemoveItemFromCart();
    const removeItem = useCallback((item: CartProduct) => {
        if (item.id) removeItemFromCart(item.id)
    }, [removeItemFromCart]);

    return (
        <div className={classes.productRow}>
            <p className={classes.nameTag}>
                {item.name}
            </p>
            <Image src={(item?.images && item?.images[0]) ?? ''} alt="" height={50} width={50} />
            <div className={classes.controlsContainer}>
                <QuantityButtonsComponent productId={item.id} quantity={item.quantity} />
                <button
                    aria-label={`remove the item ${item.name} from your cart`}
                    className={classes.controlButton}
                    onClick={() => removeItem(item)}
                >
                    <Image src="/eye.svg" alt="" height={20} width={20} />
                </button>
            </div>
        </div>
    )
};
