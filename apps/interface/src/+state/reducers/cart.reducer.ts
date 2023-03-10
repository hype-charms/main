import { createReducer } from '@reduxjs/toolkit'
import { Cart } from '../../models/cart.model'
import * as cartActions from '../actions/cart.actions'

export interface CartState {
    cart: Cart,
    loading: boolean,
    loaded: boolean,
}
export const initialCartState: CartState = {
    cart: { cartId: '', cartItems: [] },
    loading: false,
    loaded: false,
}
export default createReducer(initialCartState, (builder) =>
    builder
        .addCase(cartActions.loadCart, (state, action) => ({ ...state, cart: action.payload, loading: true, loaded: false }))
        .addCase(cartActions.loadCartSuccess, (state) => ({ ...state, loading: false, loaded: true }))
        .addCase(cartActions.increaseItemQuantitiesById, (state, action) => ({ ...state, cart: action.payload }))
        .addCase(cartActions.decreaseItemQuantitiesById, (state, action) => ({ ...state, cart: action.payload }))
        .addCase(cartActions.addItemToCart, (state, action) => ({ ...state, cart: action.payload }))
        .addCase(cartActions.removeItemFromCart, (state, action) => ({ ...state, cart: action.payload }))
)