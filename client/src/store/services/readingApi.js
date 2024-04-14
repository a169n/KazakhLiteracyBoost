import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


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