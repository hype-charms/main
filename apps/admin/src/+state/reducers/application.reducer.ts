import { createReducer } from "@reduxjs/toolkit"
import * as appActions from '../actions/application.actions'

export enum ThemeColors {
    'dark',
    'light'
}

export const initialAppState = {
    theme: ThemeColors.light
}

export interface ApplicationState {
    theme: ThemeColors
}

export default createReducer(initialAppState, builder =>
    builder
        .addCase(appActions.updateTheme, (state, action) => ({ ...state, theme: action.payload }))
)