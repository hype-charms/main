import Link from "next/link"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { CartProduct, Currency } from "../../models";
import { formatPrice, loadCheckout } from "@hype-charms/client"


export const CheckoutSummaryComponent = ({ cart }: { cart: CartProduct[] }) => {

    const [shipping, setShipping] = useState<string>();
    const [subTotal, setSubTotal] = useState<string>();
    const [total, setTotal] = useState<string>();
    const [emailForm, setEmailForm] = useState<string | undefined>(undefined);
    const [formIsInvalid, setFormInvalid] = useState<boolean>(true);

    useEffect(() => {
        const subTotal = cart?.map(x => x.unit_amount! * x.quantity!).reduce((x, y) => x! + y!)
        const shipping = 800;
        const total = subTotal + shipping;
        setShipping(formatPrice(shipping, Currency.AUD, 1));
        setSubTotal(formatPrice(subTotal, Currency.AUD, 1))
        setTotal(formatPrice(total, Currency.AUD, 1))
    }, [cart])

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
            <span className="w-full flex flex-row">
                <p className="opacity-60 text-start w-full font-bold">Sub total: </p>
                <p className="text-start">{subTotal}</p>
            </span>
            <span className="w-full flex flex-row">
                <p className="opacity-60 text-start w-full font-bold">Package & Handling: </p>
                <p className="text-start">{shipping}</p>
            </span>
            <span className="w-full flex flex-row py-3 border-y border-accent-one border-opacity-50">
                <p className="opacity-60 text-start w-full font-bold">Total: </p>
                <p className="text-start">{total}</p>
            </span>
            <form className="w-full flex flex-col gap-2" onSubmit={e => submit(e)}>
                <label htmlFor="email">Email</label>
                <span className="w-full h-12">
                    <input
                        id="email"
                        name="email"
                        className="h-12 w-full border-accent-one border-2 rounded-xl px-3"
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
                        disabled={formIsInvalid}
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
    buttonContainer: ` w-full h-full flex flex-col items-center gap-2 sticky top-40 px-7`,
}