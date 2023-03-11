import { StripeItemReference } from '@hype-charms/types';
import { createReducer } from '@reduxjs/toolkit'
import { PackMetadata } from '../../models/product.model';
import * as productPackActions from '../actions/product-pack.actions'

export interface ProductState {
    packs: StripeItemReference<PackMetadata>[] | null,
    loading: boolean;
    loaded: boolean;
}
export const initialProductState: ProductState = {
    packs: null,
    loading: true,
    loaded: false
}
export default createReducer(initialProductState, (builder) =>
    builder
        .addCase(productPackActions.loadProductPacks, (state, action) => ({ ...state, packs: action.payload }))
        .addCase(productPackActions.loadProductPackSuccess, (state) => ({ ...state, loading: false, loaded: true }))
)