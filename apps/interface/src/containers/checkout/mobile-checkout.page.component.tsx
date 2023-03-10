import Image from "next/image";
import { useCallback, useState } from "react";
import { useAppSelector } from "../../+state";
import { useRemoveItemFromCart } from "../../+state/hooks";
import { QuantityButtonsComponent } from "../../components/button/quantity-buttons.component";
import { CartProduct } from "../../models";
import { CheckoutSummaryComponent } from "../../components/checkout/checkout-summary.component";

export default function MobileCheckoutPageComponent() {
    const cart = useAppSelector((state) => state.cartReducer.cart.cartItems);
    if (cart.length === 0) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <h3>Your cart is empty</h3>
            </div>
        )
    }
    return (
        <section className="pt-7 px-2">
            <h1 className="w-full text-start text-2xl">Cart Overview</h1>
            <p className="w-full text-start" ></p>
            <div className={CartClasses.checkoutItemsContainer}>
                <MobileCartItems cart={cart} />
                <CheckoutSummaryComponent cart={cart} />
            </div>
        </section>
    )
}

const MobileCartItems = ({ cart }: { cart: CartProduct[] }) => {
    const [activeItem, setActiveItem] = useState<string | null>();
    const removeItemFromCart = useRemoveItemFromCart();
    const removeItem = useCallback((item: CartProduct) => {
        if (item.id) removeItemFromCart(item.id)
    }, [removeItemFromCart]);
    return (
        <div className={CheckoutClasses.itemWrapper}>
            {cart.map((item, idx) => (
                <div className="bg-secondary-light text-primary-text shadow py-2" key={idx}>
                    <button onClick={() => setActiveItem(activeItem === item.id ? null : item.id)} className="flex px-7 flex-row justify-between items-center w-full h-12 ">
                        <div>
                            <Image src={(item?.images && item?.images[0]) ?? ''} alt="" height={40} width={40} />
                        </div>
                        <h3>{item.name}</h3>
                        <span className={`${activeItem === item.id ? "rotate-180" : ""} h-4 w-4`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                            </svg>
                        </span>
                    </button>
                    {activeItem === item.id && <div key={idx} className={CartClasses.productRow}>
                        <div className="flex flex-col h-full gap-3">
                            <span className="flex flex-row justify-between w-full">
                            </span>
                            <p className={CartClasses.descriptionTag}>
                                {item.description?.slice(0, 100)}...
                            </p>
                            <div className={CartClasses.controlsContainer}>
                                <p className={CartClasses.priceTag}>
                                    $3.00
                                </p>
                                <QuantityButtonsComponent productId={item.id} quantity={item.quantity} />
                                <button className={CartClasses.controlButton} onClick={() => removeItem(item)}><Image src="/eye.svg" alt="" height={20} width={20} /></button>
                            </div>
                        </div>
                    </div>}
                </div>
            )
            )}
        </div>
    )
}

const CheckoutClasses = {
    itemWrapper: `h-fit w-full py-12 flex flex-col gap-2 px-7`
}

const CartClasses = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    checkoutItemsContainer: ` w-screen flex flex-col justify-start gap-2 items-start`,
    wrapper: (showCart: boolean) => ` overflow-scroll pt-20`,
    productRow: ` min-h-20 w-full mt-2 flex flex-row items-center max-w-[90vw] gap-y-2 px-7`,
    controlButton: ` h-full w-6`,
    controlsContainer: `flex flex-row min-w-[10rem] justify-start items-center gap-3 w-full`,
    nameTag: ` w-1/2 text-xl flex flex-row items-center`,
    priceTag: ` w-1/2 text-md flex flex-row items-center justify-start`,
    descriptionTag: ` text-sm`,
    goToCheckout: ` h-12 w-full bg-white absolute bottom-0`,
}