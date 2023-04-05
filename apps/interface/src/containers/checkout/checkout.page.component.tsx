import Image from "next/image";
import { useCallback } from "react";
import { useAppSelector } from "../../+state";
import { useRemoveItemFromCart } from "../../+state/hooks";
import { QuantityButtonsComponent } from "../../components/button/quantity-buttons.component";
import { CartProduct, Currency } from "../../models";
import { CheckoutSummaryComponent } from "../../components/checkout/checkout-summary.component";
import { formatPrice } from "@hype-charms/client";
import { BookingQuoteDto } from "@hype-charms/types";

export default function CheckoutPageComponent() {

    const cart = useAppSelector((state) => state.cartReducer.cart.cartItems);

    const removeItemFromCart = useRemoveItemFromCart();
    const removeItem = useCallback((item: CartProduct) => {
        if (item.id) removeItemFromCart(item.id)
    }, [removeItemFromCart]);

    if (cart?.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center w-full py-6">
                <h3>Your cart is empty</h3>
            </div>
        )
    }
    return (

        <section className={CheckoutClasses.section}>
            <h1 className="w-full text-start text-2xl pb-6">Cart Overview</h1>
            <div className={CartClasses.checkoutItemsContainer}>
                <div className={CheckoutClasses.itemWrapper}>
                    {cart?.map((item, idx) => <>
                        <div className={CartClasses.productRow}>
                            <div>
                                <Image src={(item?.images && item?.images[0]) ?? ''} alt="" height={200} width={200} />
                            </div>
                            <div className="flex flex-col h-full gap-3">
                                <span className="flex flex-row justify-between w-full">
                                    <p className={CartClasses.nameTag}>
                                        {item.name}
                                    </p>
                                    <p className={CartClasses.priceTag}>
                                        {formatPrice(item.unit_amount!, Currency.AUD, 1)}
                                    </p>
                                </span>
                                <p className={CartClasses.descriptionTag}>
                                    {item.description?.slice(0, 100)}...
                                </p>
                                <div className={CartClasses.controlsContainer}>
                                    <QuantityButtonsComponent productId={item.id} quantity={item.quantity} />
                                    <button
                                        type="button"
                                        name="remove item"
                                        aria-label="Remove item from cart"
                                        tabIndex={0}
                                        className={CartClasses.controlButton}
                                        onClick={() => removeItem(item)}
                                    >
                                        <Image src="/eye.svg" alt="" height={20} width={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                    )}
                </div>
                <CheckoutSummaryComponent cart={cart} />
            </div>
        </section>
    )
}

const CheckoutClasses = {
    buttonContainer: ` w-2/6 h-full flex flex-col items-center px-12 gap-2 sticky top-40`,
    section: ` m-auto w-4/6 my-12 flex flex-col items-end p-7`,
    itemWrapper: `h-fit w-4/6`
}

const CartClasses = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    checkoutItemsContainer: ` container m-auto flex flex-row justify-start gap-2 items-start pb-12 pt-6`,
    wrapper: (showCart: boolean) => ` overflow-scroll pt-20`,
    productRow: ` min-h-20 w-full mt-2 flex flex-row items-center max-w-[90vw] gap-y-2`,
    controlButton: ` h-full w-6`,
    controlsContainer: `flex flex-row min-w-[10rem] justify-start items-center gap-3`,
    nameTag: ` w-1/2 text-xl flex flex-row items-center`,
    priceTag: ` w-1/2 text-md flex flex-row items-center justify-end`,
    descriptionTag: ` text-sm`,
    goToCheckout: ` h-12 w-full bg-white absolute bottom-0`,
}