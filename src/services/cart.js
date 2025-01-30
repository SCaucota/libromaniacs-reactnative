import { base_url } from "../data/database";
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    tagTypes:['addProduct', 'deleteProduct', 'deleteCart'],
    endpoints: (builder) => ({
        getCart: builder.query({
            query: ({localId}) => `carts/${localId}.json`,
            providesTags:['addProduct', 'deleteProduct', 'deleteCart']
        }),
        getProductCart:builder.query({
            query:({localId, productId}) => `carts/${localId}/${productId}.json`,
            providesTags:['addProduct', 'deleteProduct']
        }),
        postCart:builder.mutation({
            query:({localId, cartProduct}) => ({
                url:`carts/${localId}/${cartProduct.id}.json`,
                method: 'PUT',
                body:cartProduct
            }),
            invalidatesTags:['addProduct']
        }),
        deleteProductCart:builder.mutation({
            query:({localId, productId}) => ({
                url:`carts/${localId}/${productId}.json`,
                method: 'DELETE',
            }),
            invalidatesTags:['deleteProduct']
        }),
        deleteCart:builder.mutation({
            query:({localId}) => ({
                url:`carts/${localId}.json`,
                method: 'DELETE',
            }),
            invalidatesTags:['deleteCart', 'addProduct', 'deleteProduct']
        }),
    }),
})

export const {
    useGetCartQuery,
    usePostCartMutation,
    useDeleteProductCartMutation,
    useDeleteCartMutation,
    useGetProductCartQuery
} = cartApi