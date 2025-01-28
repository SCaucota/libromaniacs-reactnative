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
                url:`carts/${localId}.json`,
                method: 'POST',
                body:cartProduct
            }),
            invalidatesTags:['addProduct']
        })
    }),
})

export const {
    useGetCartQuery,
    usePostCartMutation
} = cartApi