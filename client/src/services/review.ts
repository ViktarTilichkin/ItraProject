import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewApi = createApi({
    reducerPath: 'reviewApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1024/api/' }),
    endpoints: (builder) => ({
        getReview: builder.query({
            query: () => `review/`
        }),
        getReviewById: builder.query({
            query: (id) => `review/${id}`
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: `review/`,
                method: 'POST',
                body: data
            }),
        }),
        updateReview: builder.mutation({
            query: (data) => ({
                url: `review/${data.id}`,
                method: 'PUT',
                body: data
            }),
        }),
        deleteReview: builder.mutation({
            query: (id) => ({
                url: `review/${id}`,
                method: 'DELETE',
            }),
        }),
    })
})

export const { useGetReviewQuery, useGetReviewByIdQuery, useCreateReviewMutation, useUpdateReviewMutation, useDeleteReviewMutation } = reviewApi
