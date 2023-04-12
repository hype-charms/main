import { createReducer } from "@reduxjs/toolkit"
import * as orderActions from '../actions/orders.actions'

export const initialOrderState: orderState = {
    bulkSelection: null
}
export interface orderState {
    bulkSelection: string[] | null
}
export default createReducer(initialOrderState, builder =>
    builder
        .addCase(orderActions.setBulkOrdersSelection, (state, action) => {
            if (!state.bulkSelection) {
                return { ...state, bulkSelection: [action.payload] }
            } else {
                if (state.bulkSelection.some(x => x === action.payload)) {
                    return { ...state, bulkSelection: state.bulkSelection.filter(x => x !== action.payload) }
                } else {
                    return { ...state, bulkSelection: [...state.bulkSelection, action.payload] }
                }
            }
        })
)