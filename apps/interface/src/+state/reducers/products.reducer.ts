import { StripeItemReference } from '@hype-charms/types';
import { createReducer } from '@reduxjs/toolkit'
import { ProductMetadata } from '../../models/product.model';
import * as productActions from '../actions/products.actions'

export interface ProductPackState {
    products: StripeItemReference<ProductMetadata>[] | null,
    loading: boolean;
    loaded: boolean;
    activeItem: StripeItemReference | null
}
export const initialProductPackState: ProductPackState = {
    products: null,
    loading: true,
    loaded: false,
    activeItem: null,
}
export default createReducer(initialProductPackState, (builder) =>
    builder
        .addCase(productActions.loadProducts, (state, action) => ({ ...state, products: action.payload }))
        .addCase(productActions.loadProductsSuccess, (state) => ({ ...state, loading: false, loaded: true }))
)