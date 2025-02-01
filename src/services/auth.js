import { api_url, api_key } from "../data/database";
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: api_url }),
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query:(credentials) => ({
                url: `accounts:signUp?key=${api_key}`,
                method:"POST",
                body:credentials
            })
        }),
        checkEmail: builder.query({
            query: (email) => ({
                uri:`accounts:get?key=${api_key}&email=${email}`,
                method: 'GET'
            })
        }),
        login: builder.mutation({
            query:(credentials) => ({
                url: `accounts:signInWithPassword?key=${api_key}`,
                method: "POST",
                body:credentials
            })
        }),
    }),
})

export const {
    useSignUpMutation,
    useLoginMutation,
    useCheckEmailQuery
} = authApi