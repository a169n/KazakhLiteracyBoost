import axiosInstance from '@/axiosInstance';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const axiosBaseQuery = ({ baseUrl } = { baseUrl: '' }) =>
    async ({ url, method, data, params, headers }) => {
        try {
            const result = await axiosInstance({
                url: baseUrl + url,
                method,
                data,
                params,
                headers,
            })
            return { data: result.data }
        } catch (axiosError) {
            const err = axiosError
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            }
        }
    }

export const readingApi = createApi({
    reducerPath: 'readingApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    endpoints: (builder) => ({
        getAnswer: builder.mutation({
            query: (text) => ({
                url: '/getAnswer',
                method: 'POST',
                body: { text },
            })
        }),
    }),
});

export const { useGetAnswerMutation } = readingApi