import { configureStore } from "@reduxjs/toolkit";
import { shopApi } from "../services/shop";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from '../services/auth'
import userReducer  from '../features/userSlice';

export const store = configureStore({
    reducer: {
        user:userReducer,
        [shopApi.reducerPath]:shopApi.reducer,
        [authApi.reducerPath]:authApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(shopApi.middleware, authApi.middleware)
})

setupListeners(store.dispatch)