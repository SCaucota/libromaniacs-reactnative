import { base_url } from "../data/database";
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const shopApi = createApi({
    reducerPath: 'shopApi',
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => "categories.json"
        }),
        getProductsByCategory: builder.query({
            query: (category) => `products.json?orderBy="category"&equalTo="${category}"`,
        }),
        getProducts: builder.query({
            query: () => `products.json`,
        })
    }),
})

export const {
    useGetCategoriesQuery,
    useGetProductsByCategoryQuery,
    useGetProductsQuery
} = shopApi