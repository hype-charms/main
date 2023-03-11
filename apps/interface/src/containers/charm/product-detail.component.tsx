import { formatPrice } from "@hype-charms/client"
import { StripeItemReference } from "@hype-charms/types"
import Image from "next/image"
import Link from "next/link"
import { FC, useState } from "react"
import { useAppSelector } from "../../+state"
import { AddToCartComponent } from "../../components/button/add-to-cart.component"
import { QuantityButtonsComponent } from "../../components/button/quantity-buttons.component"
import { Currency } from "../../models"

interface ProductDetail {
    product: StripeItemReference,
}
export const ProductDetail: FC<ProductDetail> = ({ product }) => {
    const [quantity, setQuantity] = useState(1)
    const cart = useAppSelector(state => state.cartReducer.cart.cartItems)
    const cartHasItem = cart?.some(x => x.id === product.id);
    return (
        <>
            <span className="rounded flex flex-col gap-3">
                <h1 className="text-5xl">{product.name}</h1>
                {product.inventory && product.inventory > 0 ?
                    (<>{product.unit_amount && <p className="text-4xl py-4 font-semibold opacity-60">{formatPrice(product.unit_amount, Currency.AUD, 1)}</p>}</>) :
                    (<p className="text-black text-left text-sm opacity-50">sold out</p>)}
                <p className="text-sm">{product.description}</p>
            </span>
            <span className="rounded">
                <h4 className="text-lg">Purchase details</h4>
                {purchaseDetails.map((item, idx) =>
                    <span
                        className="flex flex-row gap-3 text-stone-500 text-sm"
                        key={idx}>
                        <h4>{item.title}</h4>
                        <h4>{item.description}</h4>
                    </span>
                )}
            </span>
            <span className="rounded flex flex-row justify-between items-center">
                <Image src={(product.images && product.images[0]) ?? ""} alt="" height={80} width={80} />
                {product.unit_amount &&
                    <p className="text-2xl flex justify-center items-center font-semibold opacity-60">{formatPrice(product.unit_amount, Currency.AUD, quantity)}</p>
                }
                <QuantityButtonsComponent onUpdateQuantities={num => setQuantity(num)} disabled={cartHasItem} />
            </span>
            {!cartHasItem ? <AddToCartComponent cartHasItem={cartHasItem} product={product} quantity={quantity} /> : <div className="flex flex-col gap-2">
                <span className="w-full flex flex-col gap-2">
                    <p className="opacity-60">Item added to cart</p>
                    <Link href="/"><p className="cursor-pointer bg-accent-one text-primary px-8 py-4 text-center hover:opacity-75 rounded">Continue Shopping</p></Link>
                </span>
                <span className="w-full flex flex-col gap-2">
                    <Link href="/checkout">
                        <p className="bg-secondary text-primary px-8 py-4 hover:opacity-75 rounded text-center">Proceed to Checkout</p>
                    </Link>
                </span>
            </div>
            }
        </>
    )
}
const purchaseDetails = [{
    title: 'Shipping:',
    description: 'Enjoy On-time Delivery Guarantee: Receive by Mar 13 via Parcels',
    tooltip: "Enjoy encrypted and secure payments View details"
},
{
    title: 'Payments:',
    description: '',
},
{
    title: 'Returns & Refunds:',
    description: 'Eligible for returns and refunds View details',
},]