import Link from "next/link"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { CartProduct, Currency } from "../../models";
import { formatPrice, loadCheckout } from "@hype-charms/client"
import { BookingQuoteDto } from "@hype-charms/types";
import Image from "next/image";


export const CheckoutSummaryComponent = ({ cart, shipping_data }: { cart: CartProduct[], shipping_data: BookingQuoteDto | null | undefined }) => {

    const [shipping, setShipping] = useState<string>();
    const [subTotal, setSubTotal] = useState<string>();
    const [total, setTotal] = useState<string>();
    const [emailForm, setEmailForm] = useState<string | undefined>(undefined);
    const [formIsInvalid, setFormInvalid] = useState<boolean>(true);
    const [loadingShippingQuote, setLoadingShippingQuote] = useState<boolean>();

    useEffect(() => {
        const subTotal = cart?.map(x => x.unit_amount! * x.quantity!).reduce((x, y) => x! + y!)!
        const shipping = 800;
        const total = subTotal + shipping;
        setShipping(formatPrice(shipping, Currency.AUD, 1));
        setSubTotal(formatPrice(subTotal, Currency.AUD, 1))
        setTotal(formatPrice(total, Currency.AUD, 1))
    }, [cart])

    useEffect(() => {
        setLoadingShippingQuote(!shipping_data)
    }, [shipping_data])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmailForm(event.currentTarget?.value)
        setFormInvalid(!event.currentTarget?.value || event.currentTarget?.value === '');
    }

    const submit = (event: FormEvent<HTMLFormElement>) => {
        if (formIsInvalid) return
        event.preventDefault();
        loadCheckout(cart, process.env.NEXT_PUBLIC_CLIENT_URL!, emailForm)
    }

    return (
        <div className={CheckoutClasses.buttonContainer}>
            <h3 className="text-start w-full text-xl">Summary</h3>
            <span className={`loaded w-full flex flex-row rounded`}>
                <p className="opacity-60 text-start w-full font-bold">Sub total: </p>
                <p className="text-start">{subTotal}</p>
            </span>
            {!loadingShippingQuote ? <span id="fade-in" className={`loaded w-full flex flex-row rounded`}>
                <p className="opacity-60 text-start w-full font-bold">Package & Handling: </p>
                <p className="text-start">{shipping}</p>
            </span> : <span id="fade-in" className={` loading w-full opacity-20 flex flex-row rounded h-6`} />}
            {!loadingShippingQuote ? <span className={`loaded w-full flex flex-row border-y-accent-one border-y-2 py-3`}>
                <p className="opacity-60 text-start w-full font-bold">Total: </p>
                <p className="text-start">{total}</p>
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