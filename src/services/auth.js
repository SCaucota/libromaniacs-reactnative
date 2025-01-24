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
    useLoginMutation
} = authApi