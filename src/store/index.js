import { configureStore } from "@reduxjs/toolkit";
import { shopApi } from "../services/shop";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from '../services/auth'
import userReducer  from '../features/userSlice';
import { userApi } from "../services/user";
import { cartApi } from "../services/cart";

export const store = configureStore({
    reducer: {
        user:userReducer,
        [shopApi.reducerPath]:shopApi.reducer,
        [authApi.reducerPath]:authApi.reducer,
        [userApi.reducerPath]:userApi.reducer,
        [cartApi.reducerPath]:cartApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(shopApi.middleware, authApi.middleware, userApi.middleware, cartApi.middleware)
})

setupListeners(store.dispatch)