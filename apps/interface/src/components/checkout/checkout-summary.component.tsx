import Link from "next/link"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { CartProduct, Currency } from "../../models";
import { formatPrice, loadCheckout } from "@hype-charms/client"
import { useAppSelector } from "../../+state";
import { useFetchShippingInfo, useLoadGeolocation } from "../../+state/hooks/shipping.hooks";


export const CheckoutSummaryComponent = ({ cart }: { cart: CartProduct[] }) => {

    const [shipping, setShipping] = useState<number>();
    const [subTotal, setSubTotal] = useState<number>();
    const [total, setTotal] = useState<number>();
    const [emailForm, setEmailForm] = useState<string | undefined>(undefined);
    const [formIsInvalid, setFormInvalid] = useState<boolean>(true);
    const [loadingShippingQuote, setLoadingShippingQuote] = useState<boolean>();
    const loadLocation = useLoadGeolocation();
    const shipping_data = useAppSelector(state => state.shippingReducer.shipping_data);
    const location = useAppSelector(state => state.shippingReducer.geo_location);

    const loadShipping = useFetchShippingInfo();

    useEffect(() => {
        const subTotal = cart?.map(x => x.unit_amount! * x.quantity!).reduce((x, y) => x! + y!)!
        setSubTotal(subTotal);
    }, [cart])

    useEffect(() => {
        if (!location) {
            loadLocation();
        }
    }, [location])

    useEffect(() => {
        if (location) {
            loadShipping();
        }
    }, [location]);

    useEffect(() => {
        if (shipping_data && shipping_data.total) {
            setLoadingShippingQuote(false);
            setShipping(shipping_data.total * 100);
            if (shipping && subTotal) { 
                setTotal(shipping + subTotal)
            }
        } else {
            setLoadingShippingQuote(true);
        }
    }, [shipping_data])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmailForm(event.currentTarget?.value)
        setFormInvalid(!event.currentTarget?.value || event.currentTarget?.value === '');
    }

    const submit = (event: FormEvent<HTMLFormElement>) => {
        if (formIsInvalid) return
        event.preventDefault();
        loadCheckout(cart, process.env.NEXT_PUBLIC_CLIENT_URL!, shipping_data, emailForm)
    }

    return (
        <div className={CheckoutClasses.buttonContainer}>
            <h3 className="text-start w-full text-xl">Summary</h3>
            {subTotal ? <span className={`loaded w-full flex flex-row rounded`}>
                <p className="opacity-60 text-start w-full font-bold">Sub total: </p>
                <p className="text-start">{formatPrice(subTotal, Currency.AUD, 1)}</p>
            </span> : <span className={` loading w-full opacity-20 flex flex-row rounded h-14`} />}
            {!loadingShippingQuote && shipping ? <span id="fade-in" className={`loaded w-full flex flex-row rounded`}>
                <p className="opacity-60 text-start w-full font-bold">Package & Handling: </p>
                <p className="text-start">{formatPrice(shipping, Currency.AUD, 1)}</p>
            </span> : <span id="fade-in" className={` loading w-full opacity-20 flex flex-row rounded h-6`} />}
            {!loadingShippingQuote && total ? <span className={`loaded w-full flex flex-row border-y-accent-one border-y-2 py-3`}>
                <p className="opacity-60 text-start w-full font-bold">Total: </p>
                <p className="text-start">{formatPrice(total, Currency.AUD, 1)}</p>
            </span> : <span className={` loading w-full opacity-20 flex flex-row rounded h-14`} />}
            <form className="w-full flex flex-col gap-2" onSubmit={e => submit(e)}>
                <label htmlFor="email">Email</label>
                <span className="w-full h-12">
                    <input
                        id="email"
                        name="email"
                        disabled={loadingShippingQuote}
                        className={` ${loadingShippingQuote ? "border-secondary" : "border-accent-one"} h-12 w-full  border-2 rounded-xl px-3`}
                        type="email"
                        placeholder="Email"
                        value={emailForm}
                        onChange={e => handleChange(e)}
                    />
                </span>
                <span className="w-full flex flex-col">
                    <p className="opacity-60 cursor-pointer hover:opacity-80">Something missing?</p>
                    <Link href="/"><p className="opacity-60 cursor-pointer hover:opacity-100 text-sm">Return to store</p></Link>
                    <p className="text-xs text-left w-full opacity-60">If you have a promotion code, your discount will be applied at the checkout</p>
                </span>
                <span className="w-full flex flex-col gap-2">
                    <button
                        disabled={formIsInvalid || loadingShippingQuote}
                        className={`${formIsInvalid ? "opacity-80" : "hover:opacity-75"} bg-secondary text-primary px-8 py-4  rounded`}
                        type="submit"
                        title="Proceed to Checkout"
                        style={{ cursor: formIsInvalid ? "not-allowed" : "pointer" }}
                    >
                        Proceed to Checkout
                    </button>
                </span>
            </form>
        </div>
    )
}


const CheckoutClasses = {
    buttonContainer: ` w-full h-full flex flex-col items-center gap-2 sticky top-40 mx-7 px-2 py-2`,
}