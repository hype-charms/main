import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import applicationReducer from './reducers/application.reducer'
import orderReducer from './reducers/orders.reducer'

export const store = configureStore({
    reducer: {
        applicationReducer,
        orderReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector