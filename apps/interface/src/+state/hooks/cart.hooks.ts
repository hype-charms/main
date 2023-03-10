import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "..";
import { Cart, CartProduct } from "../../models/cart.model";
import * as cartActions from '../actions'

export function useLoadCartFromLocal(): () => void {
    const dispatch = useDispatch();
    return useCallback(() => {
        const data = window.localStorage.getItem('cart');
        if (data) {
            const cart: Cart = JSON.parse(data);
            dispatch(cartActions.loadCart(cart));
            dispatch(cartActions.loadCartSuccess())
        }
        dispatch(cartActions.loadCartSuccess())
    }, [dispatch])
}

export function useChangeItemQuantities(): (increase: boolean, id: string) => void {
    const dispatch = useDispatch();
    const cart = useAppSelector((state) => state.cartReducer.cart);
    return useCallback((increase, id) => {
        const selectedCart = cart.cartItems.find(cartItem => cartItem.id === id);
        const index = cart.cartItems.findIndex(cartItem => cartItem.id === id);
        if (selectedCart) {
            if (increase) {
                const { cartItems } = cart;
                const updatedCart: CartProduct = { ...selectedCart, quantity: (selectedCart.quantity ?? 0) + 1 }
                const newCart: Cart = { ...cart, cartItems: [...cartItems.slice(0, index), updatedCart, ...cartItems.slice(index + 1)] }
                dispatch(cartActions.increaseItemQuantitiesById(newCart));

            } else {
                const { cartItems } = cart;
                const updatedCart: CartProduct = { ...selectedCart, quantity: (selectedCart.quantity ?? 2) - 1 }
                const newCart: Cart = { ...cart, cartItems: [...cartItems.slice(0, index), updatedCart, ...cartItems.slice(index + 1)] }
                dispatch(cartActions.decreaseItemQuantitiesById(newCart));
            }
        }
    }, [dispatch, cart])
}

export function useAddItemToCart(): (item: CartProduct) => void {
    const dispatch = useDispatch();
    const cart = useAppSelector((state) => state.cartReducer.cart);
    return useCallback((item) => {
        const selectedCart = cart.cartItems.find(cartItem => cartItem.id === item.id);
        const newCart: Cart = { ...cart, cartItems: [...cart.cartItems, { ...item }] }
        // if selected cart finds item... updates state with existing cart
        // else updates with new cart values
        return dispatch(cartActions.addItemToCart(!selectedCart ? newCart : cart))
    }, [dispatch, cart])
}

export function useRemoveItemFromCart(): (id: string) => void {
    const dispatch = useDispatch();
    const cart = useAppSelector((state) => state.cartReducer.cart);
    return useCallback((id) => {
        if (cart.cartItems.length === 0) {
            dispatch(cartActions.removeItemFromCart({ ...cart, cartItems: [] }))
        } else {
            const newCart: Cart = { ...cart, cartItems: cart.cartItems.filter(x => x.id !== id) }
            dispatch(cartActions.removeItemFromCart(newCart))
        }
    }, [dispatch, cart])
} 
