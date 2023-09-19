import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7170' }),
    endpoints: (builder) => ({

        createUser: builder.mutation({
            query: (data: any) => ({
                url: `/api/User/create`,
                method: 'POST',
                body: data
                
            }),
        }),

        getUser: builder.mutation({
            query: (data: any) => ({
                url: `api/auth`,
                method: 'POST',
                body: data
            }),
        }),
    })
})

export const { useCreateUserMutation, useGetUserMutation } = userApi


