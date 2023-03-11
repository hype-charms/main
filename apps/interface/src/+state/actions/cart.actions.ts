import { StripeItemReference } from "@hype-charms/types";
import { createAction } from "@reduxjs/toolkit";
import { Cart } from "../../models/cart.model";
import { ProductMetadata } from "../../models/product.model";

export const loadCart = createAction<Cart>('[Cart] Load Cart')
export const loadCartSuccess = createAction('[Cart] Load Cart Success')

export const increaseItemQuantitiesById = createAction<Cart>('[Cart] Increase Quantities')
export const decreaseItemQuantitiesById = createAction<Cart>('[Cart] Decrease Quantities')

export const addItemToCart = createAction<Cart>('[Cart] Add Item to Cart')
export const addItemToCartSuccess = createAction<StripeItemReference<ProductMetadata>>('[Cart] Add Item to Cart')
export const removeItemFromCart = createAction<Cart>('[Cart] Remove Item from Cart')
export const removeItemFromCartSuccess = createAction<string>('[Cart] Remove Item from Cart')