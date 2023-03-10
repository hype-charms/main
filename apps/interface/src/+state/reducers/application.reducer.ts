import { createReducer } from "@reduxjs/toolkit"
import { Currency, NotificationReference, SearchReference } from "../../models"
import * as appActions from '../actions/application.actions'

export interface ApplicationState {
    currency: Currency;
    searchReferences: SearchReference[];
    notifications: NotificationReference[] | null;
}

export const initialAppState: ApplicationState = {
    currency: Currency.AUD,
    searchReferences: [],
    notifications: null,
};
export default createReducer(initialAppState, builder =>
    builder
        .addCase(appActions.navigateToProduct, (state, action) => ({ ...state, activeItem: action.payload }))
        .addCase(appActions.loadSearchReferences, (state, action) => ({ ...state, searchReferences: [...action.payload] }))
        .addCase(appActions.setNotifications, (state, action) => ({ ...state, notifications: action.payload }))
)