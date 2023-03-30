import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './reducers/cart.reducer'
import applicationReducer from './reducers/application.reducer'
import productsReducer from './reducers/products.reducer'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import productPackReducer from './reducers/product-pack.reducer'
import shippingReducer from './reducers/shipping.reducer'

export const store = configureStore({
    reducer: {
        cartReducer,
        applicationReducer,
        productsReducer,
        productPackReducer,
        shippingReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector