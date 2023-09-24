import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const userApi = createApi({
    
    reducerPath: 'userApi',
<<<<<<< HEAD
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1024' }),
=======
    baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:1024' }),
>>>>>>> 43ba42895cec24133fde43d8d7e4fbe78bb4f340
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


