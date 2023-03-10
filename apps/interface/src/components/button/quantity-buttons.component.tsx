

import { FC, useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../+state";
import { useChangeItemQuantities } from "../../+state/hooks";

type QuantityButtonsComponentProps = {
    productId?: string;
    onUpdateQuantities?: (num: number) => void;
    quantity?: number;
    cartHasItem?: boolean;
    disabled?: boolean;
}
export const QuantityButtonsComponent: FC<QuantityButtonsComponentProps> = ({ productId, onUpdateQuantities, quantity, cartHasItem, disabled }) => {

    const [quantities, setQuantities] = useState<number>(1);
    const setQuantity = useChangeItemQuantities();
    const cart = useAppSelector(state => state.cartReducer.cart.cartItems)?.filter(x => x.id === productId)

    useEffect(() => {
        if (quantity) {
            setQuantities(quantity)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (productId && cart?.length > 0 && cart[0]?.quantity) {
            setQuantities(cart[0]?.quantity)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (cart?.length > 0 && cart[0]?.quantity) {
            setQuantities(cart[0]?.quantity)
        }
    }, [cart]);

    const updateQuantity = useCallback((num: number) => {
        if (onUpdateQuantities) {
            onUpdateQuantities(num)
            setQuantities(num);
        }
    }, [onUpdateQuantities])

    const changeQuantity = (increase: boolean) => {
        if (productId) {
            setQuantity(increase, productId)
        } else {
            updateQuantity(increase ? quantities + 1 : quantities - 1);
            updateQuantity(increase ? quantities + 1 : quantities - 1)
        }
    }
    return <div className="flex flex-row items-center justify-center gap-2">
        <button className={`${disabled || cartHasItem || quantities === 1 ? "opacity-50" : "opacity-100"} h-6 w-6 text-2xl flex`} disabled={disabled || cartHasItem || quantities === 1} onClick={() => changeQuantity(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path className="fa-primary" d="M103 241c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L103 241zm121 87l17 17c-9.4 9.4-24.6 9.4-33.9 0l17-17zm87-121c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9L311 207zM137 207L241 311 207 345 103 241 137 207zM207 311L311 207 345 241 241 345 207 311z" />
                <path className="fa-secondary" d="M64 480c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64zM241 345L345 241c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-87 87-87-87c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9L207 345c9.4 9.4 24.6 9.4 33.9 0z" />
            </svg>
        </button>
        <p className={`${disabled ? "opacity-50" : "opacity-100"} text-xl flex justify-center items-center text-center w-6`}>{quantities}</p>
        <button className={`${disabled || cartHasItem || quantities === 10 ? "opacity-50" : "opacity-100"} h-6 w-6 text-2xl flex`} disabled={disabled || cartHasItem || quantities === 10} onClick={() => changeQuantity(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path className="fa-primary" d="M103 271c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0L103 271zm121-87l17-17c-9.4-9.4-24.6-9.4-33.9 0l17 17zm87 121c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L311 305zM137 305L241 201 207 167 103 271 137 305zM207 201L311 305 345 271 241 167 207 201z" />
                <path className="fa-secondary" d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM241 167L345 271c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-87-87-87 87c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L207 167c9.4-9.4 24.6-9.4 33.9 0z" />
            </svg>
        </button>
    </div>
}