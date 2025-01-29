import { base_url } from "../data/database";
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    tagTypes:['addProduct'],
    endpoints: (builder) => ({
        getCart: builder.query({
            query: ({localId}) => `carts/${localId}.json`,
            providesTags:['addProduct']
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
            })
        }
        )
    }),
})

export const {
    useGetCartQuery,
    usePostCartMutation,
    useDeleteProductCartMutation
} = cartApi