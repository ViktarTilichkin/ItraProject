import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const userApi = createApi({
    
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1024' }),
    endpoints: (builder) => ({

        createUser: builder.mutation({
            query: (data: any) => ({
                url: `/api/User/create`,
                method: 'POST',
                body: data,
            }),
            transformResponse: (response)=>{
                return response
            },
        }),

        getUser: builder.mutation({
            query: (data: any) => ({
                url: `/api/Account/Login`,
                method: 'POST',
                body: data
            }),
            transformResponse: (response)=>{
                return response
            },
        }),
    })
})

export const { useCreateUserMutation, useGetUserMutation } = userApi


