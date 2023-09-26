import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewApi = createApi({
    reducerPath: 'reviewApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7170/api/' }),
    endpoints: (builder) => ({
        getReview: builder.query({
            query: () => `Review`
        }),
        getReviewById: builder.query({
            query: (id) => `Review/get/${id}`
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: `Review/create`,
                method: 'POST',
                body: data
            }),
            transformResponse: (response)=>{
                return response
            },
        }),
        updateReview: builder.mutation({
            query: (data) => ({
                url: `Review/update/${data.id}`,
                method: 'PUT',
                body: data
            }),
            transformResponse: (response)=>{
                return response
            },
        }),
        deleteReview: builder.mutation({
            query: (id) => ({
                url: `Review/delete/${id}`,
                method: 'DELETE',
            }),
            transformResponse: (response)=>{
                return response
            },
        }),
    })
})

export const { useGetReviewQuery, useGetReviewByIdQuery, useCreateReviewMutation, useUpdateReviewMutation, useDeleteReviewMutation } = reviewApi
