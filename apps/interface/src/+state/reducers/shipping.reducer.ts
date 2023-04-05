import { BookingQuoteDto, Geolocation } from '@hype-charms/types';
import { createReducer } from '@reduxjs/toolkit'
import * as shippingActions from '../actions/shipping.actions'

export interface ShippingState {
    geo_location: Geolocation | null,
    shipping_data: BookingQuoteDto | null
}
export const initialShippingState: ShippingState = {
    geo_location: null,
    shipping_data: null
}
export default createReducer(initialShippingState, (builder) =>
    builder
        .addCase(shippingActions.loadLocation, (state, action) => ({ ...state, geo_location: action.payload }))
        .addCase(shippingActions.loadShippingInfo, (state, action) => ({ ...state, shipping_data: action.payload }))
)